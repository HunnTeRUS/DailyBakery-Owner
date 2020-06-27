const PointSchema = require('../utils/PointSchema')

const PadariaDTO = {
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
    }
}

module.exports = PadariaDTO;