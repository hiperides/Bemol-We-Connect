var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PersonSchema = new Schema({
    'nome': String,
    'regiao': String,
    'email': String,
    'companhia': String
});

module.exports = mongoose.model('Person', PersonSchema);