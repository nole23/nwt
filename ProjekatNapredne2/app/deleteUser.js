var express = require('express');
var bodyParser = require('body-parser');

var router = express.Router();

var Korisnik = require('./models/korisnik.js');

router


    .delete('/user/:id', function(req, res) {
        if(!req.session.user){
            res.json('Niste prijavljeni');
        } else {
            var mojId = req.session.user._id;
            if(req.params.id == mojId) {
                Korisnik.remove({ _id: req.params.id}, function(err, mess) {
                    if(err) {
                        console.log('greska na serveru');
                    } else {
                        res.json('Deaktivirali ste nalog');
                    }
                })
            } else {
                res.json('Ne mozete obrisati ovaj nalog. Jedino mozete svoj nalog obrisati!');
            }
        }
    })

module.exports = router;