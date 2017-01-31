var express = require('express');
var router = express.Router();

var Korisnik = require('./models/korisnik.js');

/**
 * @author
 * Registracija novog korisnika na sistem
 * provera da li u bazi postoji dati email ako postoji vrati exeption
 */

router

    .post('/user/', function(req, res){
        var fname = req.body.ime;
        var lname = req.body.prezime;
        var pass = req.body.sifra;
        var mail = req.body.mail;

        var user = new Korisnik();
        user.ime = fname;
        user.prezime = lname;
        user.sifra = pass;
        user.mail = mail;
        
        Korisnik.findOne({mail: mail}, function(err, korisnik) {
            if(err) {
                res.json({success: false, msg: 'server'});
            }
            if(!korisnik) {
                if(!mail) {
                    res.json({success: false, msg: 'mail'});
                } else if(!pass) {
                    res.json({success: false, msg: 'sifra'});
                } else {
                    
                    user.save(function(err, saveUser){
                        if(err) {
                            res.json({success: false, msg: 'neCuva'});
                        } else {
                            res.json({success: true, msg: 'sacuvano'}); 
                        }
                    })
                }
            } else {
                res.json({success: false, msg: 'mail'});
            }
        })
                    
                    
            
    })

module.exports = router;