var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require("nodemailer");

var router = express.Router();

var Aplikacija = require('./models/aplikacija.js');
var Korisnik = require('./models/korisnik.js');
var Izuzetak = require('./models/izuzetak.js');


var transport = nodemailer.createTransport("SMTP", {
    service: 'Gmail',
    auth: {
        user: "dragann606@gmail.com",
        pass: "dragangago0123"
    }
});


router

    //Prijava greske i prvjera svih odgovornih
    //notifikacija za email
    .post('/:domen/error', function(req, res) {
        Aplikacija.findOne({domen:req.params.domen}, function(err, kor) {
            if(err) {
                return res.status(404).send('Stranica je izgubljena probajte ponovo');
            }
            if(!kor){
                return res.status(500).send('Aplikacija ne postoji ili je izbirisana u medjuvremenu');
            } else {
                
                var dome = "localhost:8080/"+req.params.domen;

                console.log(kor._id);

                var izuzetak = new Izuzetak({
                    izuzetak: req.body.izuzetak,
                    verzija: req.body.verzija,
                    vreme: dateDisplayed(Date.now()),
                    opis: req.body.opis,
                    fragment: req.body.fragment,
                    domen: req.params.domen,
                    aplikacija: [
                        kor._id
                    ]
                });

                izuzetak.save(function(err, saveErr) {
                    if(err) {
                        res.status(500).send();
                    } else {


                        Aplikacija.update({"domen":req.params.domen}, {"verzija": req.body.verzija}, function(err, proba) {
                            if(err) {
                                return res.status(404).send('Greska na serveru probajte malo kasnije');
                            } else {
                                
                                Aplikacija.find({_id: kor._id}, function(err, email) {
                                    if(err) {
                                        console.log('greska na serveru');
                                    } 
                                    if(!email) {
                                        console.log('ne postoji aplikacija');
                                    } else {
                                        email.forEach(function(korisnici) {
                                            korisnici.odgovorni.forEach(function(idOdgovorni) {
                                                Korisnik.findById(idOdgovorni, function(err, korisnik) {
                                                    if(err) {
                                                        console.log('greska na serveru');
                                                    }
                                                    if(!korisnik) {
                                                        console.log('ne postoji korisnik');
                                                    } else {
                                                        // implementirati slanje maila


                                                        var Sender = {

                                                            send: function (type, obj, users) {
                                                                console.log(obj);
                                                                if(type=='subscribe'){
                                                                    // setup e-mail data 
                                                                    var mailOptions = {
                                                                        from: 'dragann606@gmail.com', // sender address
                                                                        to: korisnik.email, // list of receivers
                                                                        subject: 'Greska na aplikaciji '+email.name, // Subject line
                                                                        text: 'Desila se greska na aplikaciji '+ email.name, // plaintext body
                                                                        
                                                                    };

                                                                }
                                                                transport.sendMail(mailOptions, function(error, info){
                                                                    if(error){
                                                                        res.json({success:false,msg:error});
                                                                        return console.log(error);
                                                                    }
                                                                    console.log('Message sent: ' + info.response);
                                                                });
                                                            }
                                                        }

                                                    }
                                                })
                                            })
                                        })
                                    }
                                })


                                res.json({message1: "desila se greska na serveru"});
                                res.status(200).send();
                            }
                        })
                    }
                })  
            }
        })
    })

    .get('/error/heandle/:domen', function(req, res) {
        var domen = req.params.domen;
        Izuzetak.find({domen: req.params.domen}, function(err, izuzetak) {
            if(err) throw err;
            if(!izuzetak) {
                res.json({success: false, msg:'Nema ni jedan izuzetak'});
            } else {
                res.json(izuzetak);
            }
        })
    })

module.exports = router;

function dateDisplayed(timestamp) {
    var date = new Date(timestamp);
    return (date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
}