const Padaria = require('../models/Padaria');
const cryp = require('./utils/EncryptMethods')
let PadariaDTO = require('../models/dto/PadariaDTO');
let Mailer = require('./utils/Mailer');

module.exports = {

    //Altera o horario/dia da ultima fornada
    async updateLastBatch(request, response) {
        const { ultima_fornada } = request.body;
        const { cnpj } = request.query;
        let updated;

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

        try {
            await Padaria.updateOne({ cnpj: cnpj }, { aberto_fechado: aberto_fechado });

            updated = await Padaria.findOne({ "cnpj": cnpj });

            if (!updated) {
                return response.status(400).json({ Erro: "CNPJ incorreto" });
            }
            return response.json(updated);
        } catch (e) {
            return response.status(400).json(e);
        }

    },

    async updatePassword(request, response) {
        const { email, novaSenha } = request.body;

        try {
            const novaSenhaCrypt = String(cryp.encrypt(novaSenha));
            await Padaria.updateOne({ "email": email }, { "senha": novaSenhaCrypt });

            return response.status(200).json();
        } catch (e) {
            return response.status(400).json(e);
        }
    },

    async forgotPassword(request, response) {
        const { email } = request.body;
        let code;

        try {
            const user = await Padaria.findOne({ email: email });

            if (user) {
                code = Mailer.sendNewPasswordCodeByEmail(email);

                return response.status(200).json({
                    email: email,
                    codigoEnviado: code,
                });
            } else {
                return response.status(404).json({ Error: "Email invalido" });
            }

        } catch (e) {
            return response.status(400).json(e);
        }
    },

    async updateAddress(request, response) {
        const { cnpj } = request.query;
        const { cep, rua, numero, bairro, cidade, estado } = request.body;

        try {
            await Padaria.updateOne({ "cnpj": cnpj }, { "cep": cep, "rua": rua, "numero": numero, "bairro": bairro, "cidade": cidade, "estado": estado });

            return response.status(200).json();
        } catch (error) {
            return response.status(400).json(error);
        }
    },

    async updatePhoneNumber(request, response) {
        const { cnpj } = request.query;
        const { numero_celular, numero_telefone } = request.body;

        try {
            await Padaria.updateOne({ "cnpj": cnpj }, { "numero_celular": numero_celular, "numero_telefone": numero_telefone });

            response.status(200).json();
        } catch (error) {
            return response.status(400).json({ Error: error });
        }

    }

}