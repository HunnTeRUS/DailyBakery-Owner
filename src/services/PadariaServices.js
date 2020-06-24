const Padaria = require('../models/Padaria');
const { request } = require('express');

module.exports = {
    async insertBakery(request, response) {
        const { nome, email, senha, numero_celular, numero_telefone,
            cnpj, aberto_fechado, ultima_fornada, cep, rua,
            numero, bairro, cidade, estado, ibge, gia, latitude, longitude } = request.body;

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        }

        const dev = Padaria.create({
            nome, email, senha, numero_celular,
            numero_telefone, cnpj, aberto_fechado,
            ultima_fornada, cep, rua,
            numero, bairro, cidade,
            estado, ibge, gia, location
        })

        response.json(dev);
    },

    async listBakery(req, res) {
        Padaria.find({}, function(err, result) {
            res.json(result);
        });
    },

    async listBakeryByName(req, res) {
        //Pega variavel pela query: localhost:3333/listBakeryByName?nome=PadariaDoZé
        const nome = req.query.nome;
        console.log(nome);

        Padaria.find({"nome": nome}, function(err, result) {
            res.json(result);
        });
    },

    async listByLocation(request, response) {
        //Buscar todos as padarias num raio de 10KM
        console.log(request.query);

        const { latitude, longitude } = request.query;

        const padarias = await Padaria.find({
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 10000,
                },
            },
        });
        
        return response.json({padarias});
    }
};