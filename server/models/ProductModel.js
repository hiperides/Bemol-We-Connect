var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    'nome': String,
    'departamento': String,
    'preco': Number
});

module.exports = mongoose.model('Product', ProductSchema);