var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IzuzetakSchema = new Schema({
    izuzetak: String,
    verzija: String,
    vreme: String,
    opis: String,
    fragment: String,
    domen: String,
    aplikacija: [{
        type: Schema.Types.ObjectId, ref: "Aplikacija"
    }]
    
});

module.exports = mongoose.model('Greska', IzuzetakSchema);