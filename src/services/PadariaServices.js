const Padaria = require('../models/Padaria');
const cryp = require('./utils/EncryptMethods');
let PadariaDTO = require('../models/dto/PadariaDTO');
const Auth = require('./Authentication/Auth');
const { options } = require('../routes');
const { numero_celular } = require('../models/dto/PadariaDTO');

module.exports = {
    async insertBakery(request, response) {

        //Como na API é recebida a latitude e longitude, é necessario pegar separado do objeto e 
        //transformar em um objeto location para colocar dentro d objeto para inserção no DB
        const { latitude, longitude } = request.body;
        PadariaDTO = request.body;

        const returnApiForValidation = await Padaria.findOne({ "cnpj": request.body.cnpj });

        if(returnApiForValidation) {
            return response.status(400).json({error: 'Já existe uma padaria cadastrada com este CNPJ!'});
        }

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

    async listBakeryByName(req, res) {
        //Pega variavel pela query: localhost:3333/listBakeryByName?nome=PadariaDoZé
        const nome = req.query.nome;

        const padarias = await Padaria.find({ "nome": nome });

        if (padarias) {
            for (var i = 0; i < padarias.length; i++){
                padarias[i].email = null;
                padarias[i].cnpj = null;
                padarias[i].senha = null;
           }
        }

        res.json({ padarias });
    },

    async findBakeryByCNPJ(req, res) {
        //Pega variavel pela query: localhost:3333/listBakeryByName?nome=PadariaDoZé
        const cnpj = req.query.cnpj;

        const padarias = await Padaria.find({ "cnpj": cnpj });

        if (padarias) {
            for (var i = 0; i < padarias.length; i++){
                padarias[i].email = null;
                padarias[i].cnpj = null;
                padarias[i].senha = null;
           }
        }

        res.json({ padarias });
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

        if (padarias) {
            for (var i = 0; i < padarias.length; i++) {
                padarias[i].email = null;
                padarias[i].cnpj = null;
                padarias[i].senha = null;
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
            }
        });

    }

};
