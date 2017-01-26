var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OdgovorniSchema = new Schema({
    
    idAprlikacija: String,
    idKorisnik: String,
    imeK: String,
    prezime: String,
    mail: String


});

module.exports = mongoose.model('Odgovorni', OdgovorniSchema);