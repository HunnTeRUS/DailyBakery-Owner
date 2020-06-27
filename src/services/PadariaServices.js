const Padaria = require('../models/Padaria');
const cryp = require('./utils/EncryptMethods')
let PadariaDTO = require('../models/dto/PadariaDTO');  

module.exports = {
    async insertBakery(request, response) {

        //Como na API é recebida a latitude e longitude, é necessario pegar separado do objeto e 
        //transformar em um objeto location para colocar dentro d objeto para inserção no DB
        const { latitude, longitude } = request.body;
        PadariaDTO = request.body;

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        }

        PadariaDTO.location = location;

        PadariaDTO.senha = String(cryp.encrypt(PadariaDTO.senha));

        const foundBakery = await Padaria.create(PadariaDTO);

        response.json(foundBakery);
    },

    async listBakery(req, res) {
        Padaria.find({}, function (err, result) {

            for(var i = 0; i<result.length; i++) {
                result[0].senha = cryp.decrypt(result[0].senha);
            }

            res.json(result);
        });
    },

    async listBakeryByName(req, res) {
        //Pega variavel pela query: localhost:3333/listBakeryByName?nome=PadariaDoZé
        const nome = req.query.nome;

        Padaria.find({ "nome": nome }, function (err, result) {
            
            for(var i = 0; i<result.length; i++) {
                result[0].senha = cryp.decrypt(result[0].senha);
            }
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

        if(padarias) {
            for(var i = 0; i<result.length; i++) {
                result[0].senha = cryp.decrypt(result[0].senha);
            }
        }

        return response.json({ padarias });
    },

    async bakeryLogin(request, response) {
        const { cnpj, senha } = request.body;

        Padaria.findOne({ "cnpj": cnpj }, (err, result) => {
            let senhaalterada = cryp.decrypt(result.senha);

            if (senha == senhaalterada) {
                result.senha = cryp.decrypt(result.senha);

                response.json(result);
            }
            else {
                response.json({ Erro: "CNPJ ou senha incorretos" })
            }
        });

    },

};