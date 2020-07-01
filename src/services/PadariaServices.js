const Padaria = require('../models/Padaria');
const cryp = require('./utils/EncryptMethods');
let PadariaDTO = require('../models/dto/PadariaDTO');
const Auth = require('./Authentication/Auth');
const { options } = require('../routes');

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

        async listBakery(req, res) { <<
            <<
            << < Updated upstream
            const padarias = await Padaria.find({});

            if (padarias) {
                for (var i = 0; i < padarias.length; i++) {
                    padarias[i].senha = cryp.decrypt(padarias[i].senha); ===
                    ===
                    =
                    Padaria.find({}, function(err, result) {

                                for (var i = 0; i < result.length; i++) {
                                    result[0].senha = cryp.decrypt(result[0].senha); >>>
                                    >>>
                                    > Stashed changes
                                }
                            }

                            res.json({ padarias });
                        },

                        async listBakeryByName(req, res) {
                            //Pega variavel pela query: localhost:3333/listBakeryByName?nome=PadariaDoZé
                            const nome = req.query.nome;

                            <<
                            <<
                            << < Updated upstream
                            const padarias = await Padaria.find({ "nome": nome });

                            if (padarias) {
                                for (var i = 0; i < padarias.length; i++) {
                                    padarias[i].senha = cryp.decrypt(padarias[i].senha);
                                } ===
                                ===
                                =
                                Padaria.find({ "nome": nome }, function(err, result) {

                                        for (var i = 0; i < result.length; i++) {
                                            result[0].senha = cryp.decrypt(result[0].senha); >>>
                                            >>>
                                            > Stashed changes
                                        }

                                        res.json({ padarias });
                                    },

                                    async listByLocation(request, response) {
                                        //Buscar todos as padarias num raio de 10KM
                                        console.log(request.query);

                                        const header = new Headers();
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

                                        if (padarias) {
                                            for (var i = 0; i < padarias.length; i++) {
                                                padarias[i].senha = cryp.decrypt(padarias[i].senha);
                                            }
                                        }

                                        return response.json({ padarias });
                                    },

                                    async bakeryLogin(request, response, options) {
                                        const { cnpj, senha } = request.body;

                                        Padaria.findOne({ "cnpj": cnpj }, (err, result) => {
                                                if (result) {
                                                    let senhaalterada = cryp.decrypt(result.senha);

                                                    if (senha == senhaalterada) {
                                                        result.senha = cryp.decrypt(result.senha);
                                                        const user = {
                                                            "cnpj": this.cnpj,
                                                            "senha": this.senha
                                                        }

                                                        const token = Auth.generateToken(user);

                                                        console.log(token);
                                                        response.header('x-access-token', token);
                                                        response.json(result);

                                                    } else {
                                                        response.json({ Erro: "CNPJ ou senha incorretos" })
                                                    }
                                                });

                                        }

                                    };
                                }