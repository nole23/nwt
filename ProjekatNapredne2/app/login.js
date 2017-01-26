var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');

var Korisnik = require('./models/korisnik.js');

/**
 * @author XX
 * Login korisnika na sistem
 * kreiranje sessije koju koristiti kao notifikaciju
 */

router

    .post('/authenticate/', function(req, res) {
        /*
        var pass = req.body.sifra;
        var mail = req.body.mail;

        Korisnik.findOne({mail: mail, sifra: pass}, function(err, korisnik) {
            if(err) {
                res.redirect('/authenticate/');
                return res.status(500).send(err);
            }
            if(!korisnik) {
                return res.status(404).send('Korisnik nije pronadjen u bazi');
            } else {
                console.log('uspjesno logovanje');
                var token = jwt.encode(korisnik, 'XWSMeanDevelopment');
                var resObject = { success: true, token: token };
                //req.session.user = korisnik;
                res.json(resObject);
                
            }
        })
        */

        Korisnik.findOne({
            mail: req.body.mail
        }, function(err, korisnik) {
            if(err) throw err;
            if(!korisnik) {
                res.send({success: false, error: 'email'});
            } else {
               Korisnik.findOne({mail: req.body.mail, sifra: req.body.sifra}, function(err, korisnik) {
                    if(err) {
                        res.send({success: false});
                    }
                    if(!korisnik) {
                        res.send({success: false, error: 'sifra'});
                    } else {
                        var token = jwt.encode(korisnik, 'XWSMeanDevelopment');
                        var resObject = { success: true, token: token };
                        res.json(resObject);
                        
                    }
                })
            }
        });
    })


module.exports = router;