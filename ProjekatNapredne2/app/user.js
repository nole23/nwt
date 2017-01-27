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
        user.save(function(err, saveUser){
            if(err) {
                console.log(err);
                Korisnik.findOne({mail:mail}, function(err, provera) {
                    if(err) {
                       res.json({success: false});
                    }
                    if(!provera) {
                        res.json({success: false, msg: 'Mail ne postoji'});
                    } else {
                        
                        res.json({success: false});
                    }
                })
                
                
            }
            res.json({success: true});
        })
    })

module.exports = router;