var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jwt-simple');
var router = express.Router();

var Aplikacija = require('./models/aplikacija.js');
var Korisnik = require('./models/korisnik.js');

router

    //dodavanje novog odgovornog za datu aplikaciju
    //ispitati da li je ulogovani korisnik odgovoran za datu aplikaciju
    .put('/user/new/:domen/:mail', function(req, res, next) {
        console.log(req.params.mail);
        console.log(req.params.domen);
        
        var auth = req.headers.authorization;

        if(auth) {
            var decoded = jwt.decode(auth, 'XWSMeanDevelopment');
            Korisnik.findOne({
                mail: decoded.mail
            }, function(err, korisnik) {
                if(err) throw err;
                if(!korisnik) {
                    res.json({success: false, msg: 'niste ulogovani'});
                } else {
                    Aplikacija.find({domen: req.params.domen}, function(err, domen) {
                        if(err) throw err;
                        if(!domen) {
                            res.json({success: false, msg: 'ne postoji aplikacija sa datim domenom'});
                        } else {
                            

                            Aplikacija.find({odgovorni: korisnik._id}, function(err, korisnikApp) {
                                if(err) throw err;
                                if(!korisnikApp) {
                                    res.json({success: false, msg:'niste odgovorni za datu aplikaciju'});
                                } else {
                                    Korisnik.findOne({mail: req.params.mail}, function(err, noviKorisnik) {
                                        if(err) throw err;
                                        if(!noviKorisnik) {
                                            res.json({success: false, msg:'korisnik ne postoji'});
                                        } else {
                                            
                                            Aplikacija.update({"domen":req.params.domen}, {$push: {"odgovorni": noviKorisnik._id}}, function(err, dodat) {
                                                if(err) {
                                                    res.json({success: false, msg: 'postoji'});   
                                                }
                                                if(!dodat) {
                                                    res.json({success: false, msg:'korisnik nije dodat'});
                                                } else {
                                                    return res.json({success: true, msg:'korisnk je uspesno dodat'});
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
        }
        /*
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
        }*/
    })

module.exports = router;