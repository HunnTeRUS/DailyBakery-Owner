const Padaria = require('../models/Padaria');
const cryp = require('./utils/EncryptMethods')
let PadariaDTO = require('../models/dto/PadariaDTO');
let Mailer = require('./utils/Mailer');
const CNPJValidation = require('./utils/CNPJValidation');
const CoolDownVerify = require('./utils/CoolDown');
const axios = require('axios');
const jwt = require("jsonwebtoken")

require('dotenv').config('../../../.env');
module.exports = {

    //Altera o horario/dia da ultima fornada
    async updateLastBatch(request, response) {
        const { ultima_fornada } = request.body;
        const { _id } = request.query;
        let updated;

        try {
            await Padaria.updateOne({ "_id": _id }, { "ultima_fornada": ultima_fornada });

            updated = await Padaria.findOne({ "_id": _id });

            if (!updated) {
                return response.status(400).json({ Erro: "CNPJ incorreto" });
            }

            return response.json(updated);

        } catch (e) {
            return response.status(400).json(e);
        }
    },

    //Altera o status da padaria: aberto/fechado
    async updateOpenedOrClosed(request, response) {
        const { _id } = request.query;
        const { aberto_fechado } = request.body;
        let updated;

        try {
            await Padaria.updateOne({ _id: _id }, { aberto_fechado: aberto_fechado });

            updated = await Padaria.findOne({ "_id": _id });

            if (!updated) {
                return response.status(400).json({ error: "CNPJ incorreto" });
            }
            return response.json(updated);
        } catch (e) {
            return response.status(400).json({ error: e });
        }

    },

    async updatePassword(request, response) {
        const { _id, email, novaSenha } = request.body;

        try {
            const user = await Padaria.findOne({ _id: _id, email: email });

            if (user) {
                const novaSenhaCrypt = String(cryp.encrypt(novaSenha));
                await Padaria.updateOne({ "_id": _id, "email": email }, { "senha": novaSenhaCrypt });
                return response.status(200).json();
            }

            return response.status(404).json({ error: "Email/CNPJ não encontrado" });
        } catch (e) {
            return response.status(400).json({ error: e });
        }
    },

    async forgotPassword(request, response) {
        const { cnpj } = request.body;
        let code;

        if (!CNPJValidation.validarCNPJ(cnpj))
            return response.status(404).json({ error: "CNPJ invalido" });

        try {
            const user = await Padaria.findOne({ cnpj: cnpj });

            if (user) {
                code = Mailer.sendNewPasswordCodeByEmail(user.email);

                return response.status(200).json({
                    email: user.email,
                    cnpj: user.cnpj,
                    codigoEnviado: code,
                });
            } else {
                return response.status(404).json({ error: "CNPJ invalido ou não encontrado" });
            }

        } catch (e) {
            return response.status(400).json({ error: e });
        }
    },

    async updateAddress(request, response) {
        const { _id } = request.query;
        const { cep, rua, numero, bairro, cidade, estado, latitude, longitude } = request.body;
        const data_atualizacao = new Date();

        try {
            await Padaria.updateOne({ "_id": _id }, { "cep": cep, "rua": rua, "numero": numero, "bairro": bairro, "cidade": cidade, "estado": estado, "longitude": longitude, "latitude": latitude, "tempo_espera": data_atualizacao });

            return response.status(200).json();
        } catch (error) {
            return response.status(400).json(error);
        }
    },

    async updatePhoneNumber(request, response) {
        const _id = request.query._id;
        const { numero_celular, numero_telefone } = request.body;

        try {
            if ((numero_celular != null && numero_celular != "") && (numero_telefone != null && numero_telefone != ""))
                await Padaria.updateOne({ "_id": _id }, { "numero_celular": numero_celular, "numero_telefone": numero_telefone });

            else if ((numero_telefone === undefined || numero_telefone === null || numero_telefone === ""))
                await Padaria.updateOne({ "_id": _id }, { "numero_celular": numero_celular, 'numero_telefone': "" });

            response.status(200).json();

        } catch (error) {
            return response.status(400).json({ error: error });
        }

    },



    async getAddressByCep(request, response) {
        const { cep, numero, _id } = request.body;

        await Padaria.findOne({ "_id": _id }).then(resp => {
            if (!CoolDownVerify.CoolDown(resp.tempo_espera)) { return response.status(406).json({ error: "Endereço alterado recentemente" }); }
        })
        await axios.get('https://www.cepaberto.com/api/v3/cep', {
                headers: { "Authorization": 'Token token=b8589b52d467c9c5ded3c65c244b4fe6' },
                params: { cep: cep }
            })
            .then(responseAPI => {
                responseAPI.data.logradouro;
                responseAPI.data.bairro;
                responseAPI.data.cidade = responseAPI.data.cidade.nome;
                responseAPI.data.estado = responseAPI.data.estado.sigla;

                response.json(responseAPI.data);
            })
            .catch((error) => {
                return axios.get(`http://viacep.com.br/ws/${cep}/json/`)
                    .then(responseAPI => {
                        responseAPI.data.estado = responseAPI.data.uf;
                        responseAPI.data.cidade = responseAPI.data.localidade;
                        return response.json(responseAPI.data);
                    }).catch((error => {
                        return response.status(400).json({
                            error: error
                        })
                    }))
            });

    },

    async getCnpjFromWs(request, response) {
        const { cnpj } = request.query;
        let bakery, situacao;

        bakery = await Padaria.findOne({ "cnpj": cnpj });

        if (bakery) {
            return response.status(400).json({ error: "Já existe um cadastro dessa padaria em nossa base" });
        }
        axios.get(`https://www.receitaws.com.br/v1/cnpj/${cnpj}`, {
                headers: { "Authorization": 'Bearer ' + process.env.TOKEN_WS }
            })
            .then(responseAPI => {
                situacao = responseAPI.data.situacao;
                if (situacao == "ATIVA") { return response.status(200).json(responseAPI.data); }
                return response.status(406).json({ error: "Infelizmente a padaria não pode ser cadastrada por estar com o status inativo na receita federal" });
            })
            .catch((erro) => {
                return response.json({ error: erro });
            });
    },

    async verifyToken(request, response) {
        const { cnpj } = request.body;

        if (!CNPJValidation.validarCNPJ(cnpj))
            return response.status(400).json({ error: "CNPJ inválido" });

        const padarias = await Padaria.findOne({ "cnpj": cnpj });

        if (padarias) {
            padarias.email = null;
            padarias.senha = null;
            return response.status(200).json(padarias);
        } else response.status(400).json({ error: "Não foi possivel retornar a padaria a partir do token" });
    }

}