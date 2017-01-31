var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jwt-simple');

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
    })
    .get('/user/app/all', function(req, res) {
        var auth = req.headers.authorization;
        if(auth) {
            var decoded = jwt.decode(auth, 'XWSMeanDevelopment');
            Korisnik.findOne({
                mail: decoded.mail
            }, function(err, korisnik) {
                if(err) throw err;
                if(!korisnik) {
                    return res.status(403).send({success: false, msg: 'Ulogujte se'});
                } else {
                    var entry = {};
                    entry = {ObjectId: new RegExp(korisnik._id, 'i')};
                    console.log('entry: '+entry._id);
                    Aplikacija.find({odgovorni: korisnik._id}).exec(function(err, data) {
                        res.json(data);
                    })
                }
            });
        } else {
            return res.status(403).send({success: false, msg: 'Nema tokena'});
        }
        
    })
    .get('/application/all', function(req, res) {
        
        Aplikacija.find({}, function(err, data) {
            if(err) {
                res.json({success: false, msg: 'ne valja nesto'});
            }
            if(!data) {
                res.json({success: false, msg: 'nema ni jedne aplkacije'});    
            } else {
                res.json(data);
                
            }
        })
    })
    
module.exports = router;

