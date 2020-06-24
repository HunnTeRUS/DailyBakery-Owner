const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema')

const PadariaSchema = mongoose.Schema({
    nome: String, 
    email: String,
    senha: String,
    numero_celular: String,
    numero_telefone: String,
    cnpj: String,
    aberto_fechado: Boolean,
    ultima_fornada: String,
    cep: String,
    rua: String,
    numero: String,
    bairro: String,
    cidade: String,
    estado: String,
    ibge: String,
    gia: String,
    location: {
        type: PointSchema,
        index: '2dsphere'
    }
});

module.exports = mongoose.model('Padaria', PadariaSchema);