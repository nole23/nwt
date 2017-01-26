var express = require('express');
var bodyParser = require('body-parser');

var router = express.Router();

var Aplikacija = require('./models/aplikacija.js');
var Korisnik = require('./models/korisnik.js');

router

    //dodavanje novog odgovornog za datu aplikaciju
    //ispitati da li je ulogovani korisnik odgovoran za datu aplikaciju
    .put('/:domen/user', function(req, res, next) {
        if(!req.session.user) {
            return res.status(200).send('Morate se se prijaviti da bi nastavili sa radom');
        } else {
            Aplikacija.find({domen:req.params.domen}, function(err, provera1) {
                if(err) {
                    return res.status(404).send('Greska na serveru probajte malo kasnije');
                }
                if(!provera1) {
                    return res.status(500).send('Ne postoji aplikacija sa datim domenom');
                } else {
                    Aplikacija.find({odgovorni:req.session.user}, function(err, provera2) {
                        if(err) {
                            return res.status(404).send('Greska na serveru probajte malo kasnije');
                        }
                        if(!provera2) {
                            return res.status(500).send('Ne mozete dodati novog odgovornog aplikacije ako vi niste odgovorni za nju');
                        } else {
                            Korisnik.findOne({mail:req.body.mail}, function(err, kor) {
                                if(err) {
                                    return res.status(404).send('Greska na serveru probajte malo kasnije');
                                }
                                if(!kor) {
                                    return res.status(500).send('Korisnik ne postoji u bazi, proverite mail');
                                } else {
                                    Aplikacija.update({"domen":req.params.domen}, {$push: {"odgovorni": kor._id}}, function(err, proba) {
                                        if(err) {
                                            return res.status(404).send('Greska na serveru probajte malo kasnije');
                                        } else {
                                            return res.status(200).send('Dodat je '+kor.ime+' kao odgovoran za apliaciju '+req.params.domen);
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })

module.exports = router;