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

        Korisnik.findOne({
            mail: req.body.mail
        }, function(err, korisnik) {
            if(err) throw err;
            if(!korisnik) {
                res.send({success: false, error: 'email'});
            } else {
               Korisnik.findOne({mail: req.body.mail, sifra: req.body.sifra}, function(err, korisnik) {
                    if(err) {
                        res.send({success: false, msg: 'sifra'});
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