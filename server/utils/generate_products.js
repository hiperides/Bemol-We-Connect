var mongoose = require("mongoose");
var faker = require("faker");
var ProductModel = require("../models/ProductModel");

mongoose.connect('mongodb://localhost:27017/autenticacao_teste',
    { useNewUrlParser: true, useUnifiedTopology: true });

async function add(n){
    try{
        for(let i=0;i<n;i++){
            const p = new ProductModel();
            p.nome = faker.commerce.productName();
            p.departamento = faker.commerce.department();
            p.preco = faker.commerce.price();
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