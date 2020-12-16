const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const PointSchema = require('./utils/PointSchema')

const PadariaSchema = mongoose.Schema({
    nome: String,
    email: String,
    senha: String,
    numero_celular: String,
    numero_telefone: String,
    cnpj: String,
    aberto_fechado: Boolean,
    ultima_fornada: Date,
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
    },
    tempo_espera: Date
});

PadariaSchema.methods = {
    generateToken(user) {
        return jwt.sign(user, process.env.SECRET, {
            expiresIn: 86400
        });
    }
};

module.exports = mongoose.model('Padaria', PadariaSchema);