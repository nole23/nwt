var express = require('express');
var router = express.Router();

/**
 * @author Novica Nikolic
 * Pocetna stranica namenjena za testiranje sistema
 * moze sluziti kao i stranica za redirekciju
 */

router
    //pocetna stranica 
    .get('/', function(req, res) {
        if(req.session.user === null){
            console.log('greska')
        }
        res.json({message1: 'Ako zelite da se ulogujete: www.localhost:8080/api/login',
                  message2: 'Ako zelite da se registrujete: www.localhost:8080/api/registration'});
    })

module.exports = router;