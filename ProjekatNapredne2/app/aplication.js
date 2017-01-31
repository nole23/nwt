var express = require('express');
var router = express.Router();
var passport  = require('passport');
var jwt = require('jwt-simple');


var Aplikacija = require('./models/aplikacija.js');
var Korisnik = require('./models/korisnik.js');

/**
 * @author
 * Dodavanje nove aplikacije. Aplikaciju moze dodati samo registrovani korisnik.
 * I prilikom registracije aplikacije korisnik koji ju je dodao automatski postaje 
 * odgovoran za nju.
 */

router
    
    .post('/aplication', function(req, res) {

        var auth = req.headers.authorization;
        if(auth) {
            var decoded = jwt.decode(auth, 'XWSMeanDevelopment');
            Korisnik.findOne({
                mail: decoded.mail
            }, function(err, korisnik) {
                if(err) throw err;
                if(!korisnik) {
                    return res.status(403).send({success: false, msg: 'Ulogujte se'});
                } else {

                    Aplikacija.findOne({dome:req.body.domen}, function(err, provera) {
                        if(err) {
                            return res.status(403).send({success: false, msg: 'Neuspesno'});
                        }
                        if(!proba) {
                            var proba = new Aplikacija({

                                naziv: req.body.naziv,
                                opis: req.body.opis,
                                verzija: req.body.verzija,
                                link: req.body.link,
                                domen: req.body.domen,
                                odgovorni: [
                                    korisnik._id
                                ]
                            });
                            proba.save( function(err, document){
                                if(err){
                                    console.log(err);
                                    return res.status(403).send({success: false, msg: 'nemoguce cuvanje'});
                                } else {
                                    return res.status(200).send({success: true, msg: 'sacuvano'});
                                }
                            });
                        } else {
                            return res.status(403).send({success: false, msg: 'ova aplikacija vec postoji'});
                        }
                    })
                    
                }
            });
        } else {
            return res.status(403).send({success: false, msg: 'Nema tokena'});
        }
       
    })


module.exports = router;