const Padaria = require('../models/Padaria');
const cryp = require('./utils/EncryptMethods');
let PadariaDTO = require('../models/dto/PadariaDTO');
const Auth = require('./Authentication/Auth');
const CNPJValidation = require('./utils/CNPJValidation');

module.exports = {
    async insertBakery(request, response) {

        //Como na API é recebida a latitude e longitude, é necessario pegar separado do objeto e 
        //transformar em um objeto location para colocar dentro d objeto para inserção no DB
        const { latitude, longitude } = request.body;
        PadariaDTO = request.body;

        if (!CNPJValidation.validarCNPJ(PadariaDTO.cnpj)) {
            return response.status(400).json({ error: "CNPJ inválido" });
        }

        if ((!(-90 < latitude) || !(latitude < 90)) || (!(-180 < longitude) || !(longitude < 180))) {
            return response.status(400).json({ error: 'Latitude e/ou longitude incorretos!' });
        }

        const validationOfCnpjDuplicates = await Padaria.findOne({ "cnpj": PadariaDTO.cnpj });

        if (validationOfCnpjDuplicates) {
            return response.status(400).json({ error: 'Já existe uma padaria cadastrada com este CNPJ!' });
        }

        const validationOfEmailDuplicates = await Padaria.findOne({ "email": PadariaDTO.email });

        if (validationOfEmailDuplicates) {
            return response.status(400).json({ error: 'Já existe uma padaria cadastrada com este email!' });
        }

        const validationOfAdressDuplicates = await Padaria.findOne({ "latitude": PadariaDTO.cep, "numero": PadariaDTO.numero });

        if (validationOfAdressDuplicates) {
            return response.status(400).json({ error: 'Já existe uma padaria cadastrada neste endereço!' });
        }

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        }

        PadariaDTO.location = location;

        PadariaDTO.senha = String(cryp.encrypt(PadariaDTO.senha));

        const foundBakery = await Padaria.create(PadariaDTO);
        foundBakery.email = null;
        foundBakery.cnpj = null;
        foundBakery.senha = null;

        response.json(foundBakery);
    },

    async listBakery(req, res) {
        const padarias = await Padaria.find({});

        if (padarias) {
            for (var i = 0; i < padarias.length; i++) {
                padarias[i].email = null;
                padarias[i].cnpj = null;
                padarias[i].senha = null;
            }
        }

        res.json({ padarias });
    },

    async listBakeryByListIds(req, res) {
        let padarias;

        if (!req.body.idList) {
            res.status(400).json({});
        }

        padarias = await Padaria.find({ '_id': { $in: req.body.idList } });

        if (padarias) {
            for (var i = 0; i < padarias.length; i++) {
                padarias[i].email = null;
                padarias[i].cnpj = null;
                padarias[i].senha = null;
            }
        }

        res.json(padarias);
    },

    async listBakeryByName(req, res) {
        //Pega variavel pela query: localhost:3333/listBakeryByName?nome=PadariaDoZé
        const nome = req.query.nome;

        const padarias = await Padaria.find({ "nome": new RegExp("^" + nome) })

        if (padarias) {
            for (var i = 0; i < padarias.length; i++) {
                padarias[i].email = null;
                padarias[i].cnpj = null;
                padarias[i].senha = null;
            }
        }

        res.json({ padarias });
    },

    async getBakeryById(req, res) {
        const _id = req.query._id;

        const padaria = await Padaria.findOne({ "_id": _id })

        if (padaria) {
            padaria.email = null;
            padaria.cnpj = null;
            padaria.senha = null;
            res.status(200).json({ padaria });
        } else res.status(404).json({});
    },


    async findBakeryByCNPJ(req, res) {
        //Pega variavel pela query: localhost:3333/listBakeryByName?nome=PadariaDoZé
        const _id = req.query._id;

        const padarias = await Padaria.find({ "_id": _id });

        if (padarias) {
            for (var i = 0; i < padarias.length; i++) {
                padarias[i].email = null;
                padarias[i].cnpj = null;
                padarias[i].senha = null;
            }
        } else {
            return res.status(400).json({ error: "Padaria não encontrada!" })
        }

        res.json({ padarias });
    },

    async listByLocation(request, response) {
        //Buscar todos as padarias num raio de 10KM
        const { latitude, longitude } = request.query;

        if ((!(-90 < latitude) || !(latitude < 90)) || (!(-180 < longitude) || !(longitude < 180)))
            return response.status(400).json({ error: 'Latitude e/ou longitude incorretos!' });

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
                padarias[i].email = null;
                padarias[i].cnpj = null;
                padarias[i].senha = null;
            }
        }

        return response.json({ padarias });
    },

    //ENDPOINT de login
    async bakeryLogin(request, response, options) {
        const { cnpj, senha } = request.body;

        if (CNPJValidation.validarCNPJ(cnpj)) {
            const result = await Padaria.findOne({ "cnpj": cnpj });
            if (result) {
                let senhaalterada = cryp.decrypt(result.senha);

                if (senha == senhaalterada) {
                    result.senha = cryp.decrypt(result.senha);
                    const user = {
                        "cnpj": this.cnpj,
                        "senha": this.senha
                    }

                    const token = Auth.generateToken(user);

                    response.header('x-access-token', token);
                    response.json(result);

                } else {
                    return response.status(404).json({ error: 'CNPJ ou senha incorretos!' });
                }
            } else {
                return response.status(400).json({ error: 'CNPJ ou senha incorretos!' });
            }
        } else {
            return response.status(400).json({ error: 'CNPJ invalido!' });
        }

    },
};