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
                        return res.status(404).send('Greska na serveru');
                    }
                    if(!provera) {
                        return res.status(500).send('Niste se ulogovali proverite podatke koje unosite');
                    } else {
                        
                        return res.status(500).send('Ovaj mail je vec registrovan u bazi');
                    }
                })
                
                
            }
            return res.status(200).send('Uspjesno ste se registrovali mozete se ulogovati');  
        })
    })

module.exports = router;