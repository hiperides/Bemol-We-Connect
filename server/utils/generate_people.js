var mongoose = require("mongoose");
var faker = require("faker");
var PersonModel = require("../models/PersonModel");

mongoose.connect('mongodb://localhost:27017/autenticacao_teste',
    { useNewUrlParser: true, useUnifiedTopology: true});

async function add(n){
    try{
        for(let i=0;i<n;i++){
            const p = new PersonModel();
            p.nome = faker.name.findName();
            p.regiao = faker.address.country();
            p.email = faker.internet.email();
            p.companhia = faker.company.companyName();
            await p.save();
        }
    }
    catch(err){
        console.log(err);
    }
}

add(100)
    .then(()=>{
        console.log("Ok");
        mongoose.disconnect();
    })