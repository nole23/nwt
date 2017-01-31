var express = require('express');
var router = express.Router();

var Korisnik = require('./models/korisnik.js');

/**
 * @author
 * Prikaz svih registrovanih korisnika
 */

router

    
    .get('/users/all', function(req, res) {
        Korisnik.find({}, function(err, kori) {
            if(err) {
                return res.status(500).send('Greska na serveru probajte ponovo');
            }
            if(!kori) {
                return res.status(200).send('U bazi ne postoji ni jedan korisnik');
            }
            return res.status(200).json(kori);
        })
    })
    .get('/users/find/:mail', function(req, res) {
        var param = req.params.mail;
        Korisnik.find({'mail': new RegExp(param, 'i')}, function(err, kori) {
            if(err) {
                return res.status(500);
            }if(!kori) {
                return res.status(500);
            }
            res.json(kori);
        })
        
    })


module.exports = router;