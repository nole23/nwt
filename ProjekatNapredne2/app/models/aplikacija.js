var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AplikacijaSchema = new Schema({
    naziv: String,
    opis: String,
    verzija: String,
    link: String,
    domen: String,
    odgovorni: [{
       type: Schema.Types.ObjectId, ref: "Korisnik"
    }]

});

module.exports = mongoose.model('Aplikacija', AplikacijaSchema);
