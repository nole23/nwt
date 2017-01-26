var express = require('express');
var router = express.Router();

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
        if (!req.session.user) {
            return res.status(200).send('Morate se se prijaviti da bi nastavili sa radom');
        } else {
            Aplikacija.findOne({dome:req.body.domen}, function(err, provera) {
                if(err) {
                    return res.status(404).send('Stranica je izgubljena probajte ponovo');
                }
                if(!proba) {
                    var proba = new Aplikacija({

                        naziv: req.body.naziv,
                        opis: req.body.opis,
                        verzija: req.body.verzija,
                        link: req.body.link,
                        domen: req.body.domen,
                        odgovorni: [
                            req.session.user._id
                        ]
                    });
                    proba.save( function(err, document){
                        if(err){
                            console.log(err);
                            return res.status(500).send('Nije moguce sacuvati zeljene podatke');
                        } else {
                            return res.status(200).send('Uspjesno ste sacuvali aplikaciju');
                        }
                    });
                } else {
                    return res.status(200).send('Aplikacija sa datim domenom vec postojo u sistemu');
                }
            })




                            
        }
    })

module.exports = router;