var express = require('express');
var bodyParser = require('body-parser');

var router = express.Router();

var Aplikacija = require('./models/aplikacija.js');
var Korisnik = require('./models/korisnik.js');
var Izuzetak = require('./models/izuzetak.js');


//vise rutera
router

    //Prikaz aplikacije
    .get('/:domen', function(req, res) {
        Aplikacija.findOne({domen:req.params.domen}).populate('odgovorni').exec( function(err, proba) {
            if(err) {
                return res.status(500).send('Greska na serveru probajte ponovo');
            }
            if(!proba) {
                return res.status(200).send('U bazi ne postoji ni jedan korisnik');
            } else {
                return res.status(200).json(proba);
            }
        })
    });

module.exports = router;

