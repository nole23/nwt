var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AplikacijaSchema = new Schema({
    naziv: String,
    opis: String,
    verzija: String,
    link: String,
    domen: {
         type: String,
         unique: true
    },
    odgovorni: [{
       type: Schema.Types.ObjectId, ref: "Korisnik",
       unique: true
    }]

});

module.exports = mongoose.model('Aplikacija', AplikacijaSchema);
