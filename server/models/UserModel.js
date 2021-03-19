var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    //Aba de Dados Pessoais
    'pessoafisjur': String,
    'nome': String,
    'dtnascimento': Date,
    'sexo': String,
    'cpf': String,
    'rg': String,
    'telefone': String,
    'celular': String,
    //Aba de Dados de Endereço
    'cep': String,
    'endereco': String,
    'cidade': String,
    'estado': String,
    'bairro': String,
    'numero': String,
    'complemento': String,
    'referencia': String,
    //Aba de Dados da Conta
    'email': String,
    'senha': String,
    'confirmasenha': String
})

module.exports = mongoose.model('User', UserSchema);