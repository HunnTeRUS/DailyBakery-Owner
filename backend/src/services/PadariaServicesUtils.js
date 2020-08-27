const Padaria = require('../models/Padaria');
const cryp = require('./utils/EncryptMethods')
let PadariaDTO = require('../models/dto/PadariaDTO');
let Mailer = require('./utils/Mailer');
const CNPJValidation = require('./utils/CNPJValidation');
const axios = require('axios');
const { numero } = require('../models/dto/PadariaDTO');

module.exports = {

    //Altera o horario/dia da ultima fornada
    async updateLastBatch(request, response) {
        const { ultima_fornada } = request.body;
        const { cnpj } = request.query;
        let updated;

        if (!CNPJValidation.validarCNPJ(cnpj))
            return response.status(400).json({ Erro: "CNPJ inválido" });

        try {
            await Padaria.updateOne({ "cnpj": cnpj }, { "ultima_fornada": ultima_fornada });

            updated = await Padaria.findOne({ "cnpj": cnpj });

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
        const { cnpj } = request.query;
        const { aberto_fechado } = request.body;
        let updated;

        if (!CNPJValidation.validarCNPJ(cnpj))
            return response.status(400).json({ Erro: "CNPJ inválido" });

        try {
            await Padaria.updateOne({ cnpj: cnpj }, { aberto_fechado: aberto_fechado });

            updated = await Padaria.findOne({ "cnpj": cnpj });

            if (!updated) {
                return response.status(400).json({ error: "CNPJ incorreto" });
            }
            return response.json(updated);
        } catch (e) {
            return response.status(400).json({error: e});
        }

    },

    async updatePassword(request, response) {
        const { cnpj, email, novaSenha } = request.body;

        if (!CNPJValidation.validarCNPJ(cnpj))
            return response.status(400).json({ error: "CNPJ inválido" });

        try {
            const user = await Padaria.findOne({ cnpj: cnpj, email: email });

            if(user) {
                const novaSenhaCrypt = String(cryp.encrypt(novaSenha));
                await Padaria.updateOne({ "cnpj": cnpj, "email": email }, { "senha": novaSenhaCrypt });
                return response.status(200).json();
            }

            return response.status(404).json({ error: "Email/CNPJ não encontrado" });
        } catch (e) {
            return response.status(400).json({error: e});
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
                return response.status(404).json({ error: "Email invalido" });
            }

        } catch (e) {
            return response.status(400).json({error: e});
        }
    },

    async updateAddress(request, response) {
        const { cnpj } = request.query;
        const { cep, rua, numero, bairro, cidade, estado } = request.body;
        const { tempo_espera } = Padaria.findOne({ "cnpj": cnpj });
        const data_atualizacao = new Date.now();

        if (!CNPJValidation.validarCNPJ(cnpj)) { return response.status(400).json({ Erro: "CNPJ inválido" }); }
        if (!CNPJUpdate.CoolDown(tempo_espera)) { return response.status(406).json({ Error: "Endereço alterado recentemente" }); }
        try {
            await Padaria.updateOne({ "cnpj": cnpj }, { "cep": cep, "rua": rua, "numero": numero, "bairro": bairro, "cidade": cidade, "estado": estado, "tempo_espera": data_atualizacao });

            return response.status(200).json();
        } catch (error) {
            return response.status(400).json(error);
        }
    },

    async updatePhoneNumber(request, response) {
        const cnpj = request.query.cnpj;
        const { numero_celular, numero_telefone } = request.body;

        console.log(numero_celular, numero_telefone )

        if (!CNPJValidation.validarCNPJ(cnpj))
            return response.status(400).json({ Erro: "CNPJ inválido" });

        try {
            if ((numero_celular != null && numero_celular != "") && (numero_telefone != null && numero_telefone != ""))
                await Padaria.updateOne({ "cnpj": cnpj }, { "numero_celular": numero_celular, "numero_telefone": numero_telefone });

            else if ((numero_telefone === undefined || numero_telefone === null || numero_telefone === ""))
                await Padaria.updateOne({ "cnpj": cnpj }, { "numero_celular": numero_celular, 'numero_telefone': "" });

            response.status(200).json();

        } catch (error) {
            return response.status(400).json({ Error: error });
        }

    },



    async getAddressByCep(request, response) {
        const { cep } = request.query;

        let logradouro, bairro, cidade, estado;

        axios.get('https://www.cepaberto.com/api/v3/cep', {
                headers: { "Authorization": 'Token token=b8589b52d467c9c5ded3c65c244b4fe6' },
                params: { cep: cep }
            })
            .then(responseAPI => {
                logradouro = responseAPI.data.logradouro;
                bairro = responseAPI.data.bairro;
                cidade = responseAPI.data.cidade;
                estado = responseAPI.data.estado;

                response.json(responseAPI.data);
            })
            .catch((error) => {
                console.log('error' + error);
            });

    },

    async getCnpjFromWs(request, response) {
        const { cnpj } = request.query;

        let bakery, situacao;

        bakery = await Padaria.findOne({ "cnpj": cnpj });

        if (bakery) {
            return response.status(400).json({ Error: "Já existe um cadastro dessa padaria em nossa base" });
        }
        axios.get(`https://www.receitaws.com.br/v1/cnpj/${cnpj}`, {
                headers: { "Authorization": 'Bearer ' + process.env.TOKEN_WS }
            })
            .then(responseAPI => {
                situacao = responseAPI.data.situacao;
                if (situacao == "ATIVA") { return response.status(200).json(responseAPI.data); }
                return response.status(406).json({ Error: "Padaria não pode ser cadastrada" });
            })
            .catch((erro) => {
                return response.json({ Error: erro });
            });
    },

    async verifyToken(request, response) {
        return response.status(200);
    }

}