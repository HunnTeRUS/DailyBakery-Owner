const User = require('../models/User');
const UserDTO = require('../models/dto/UserDTO')
const cryp = require('./utils/EncryptMethods');
const { updatePhoneNumber } = require('./PadariaServicesUtils');

module.exports = {
    async createUser(request, response) {
        const UserDTO = request.body;

        const validationEmail = await User.findOne({ "email": UserDTO.email });

        if (validationEmail) {
            return response.status(400).json({ error: 'Já existe um usuário cadastrado com este e-mail!' });
        }

        const validationCellphone = await User.findOne({ "numero_celular": UserDTO.numero_celular });

        if (validationCellphone) {
            return response.status(400).json({ error: 'Já existe um usuário cadastrado com este número de celular!' });
        }
        UserDTO.senha = String(cryp.encrypt(UserDTO.senha));

        const newUser = await User.create(UserDTO);

        newUser.senha = null;

        return response.json(newUser);
    },

    async loginUser(request, response) {
        const { email, senha } = request.body;

        const result = await Padaria.findOne({ "email": email });
        if (result) {
            let senhaalterada = cryp.decrypt(result.senha);

            if (senha == senhaalterada) {
                result.senha = cryp.decrypt(result.senha);
                return response.json(result);
            } else {
                return response.status(404).json({ error: 'E-mail e/ou senha incorretos!' });
            }
        } else {
            return response.status(400).json({ error: 'E-mail e/ou senha incorretos!' });
        }
    },


    async updatePassword(request, response) {
        const { id, novaSenha } = request.body;

        try {
            const user = await Padaria.findOne({ _id: id });

            if (user) {
                const novaSenhaCrypt = String(cryp.encrypt(novaSenha));
                await Padaria.updateOne({ "_id": id }, { "senha": novaSenhaCrypt });
                return response.status(200).json();
            }
            return response.status(404).json({ error: "Email/senha não encontrado" });
        } catch (e) {
            return response.status(400).json({ error: e });
        }
    },

    async forgotPassword(request, response) {
        const { email } = request.body;
        let code;
        try {
            const user = await User.findOne({ email: email });
            if (user) {
                code = Mailer.sendNewPasswordCodeByEmail(user.email);

                return response.status(200).json({
                    email: user.email,
                    codigoEnviado: code,
                });
            } else {
                return response.status(404).json({ error: "E-mail inválido ou não encontrado" });
            }
        } catch (e) {
            return response.status(400).json({ error: e });
        }
    },

    async updateName(request, response) {
        const { id, name } = request.body;

        try {
            const user = await User.updateOne({ "_id": id }, { "nome": name });
            return response.status(200).json({ user });
        } catch (e) {
            return response.status(400).json({ error: "Não foi possível atualizar o nome, tente novamente mais tarde!" });
        }
    },

    async updatePhoneNumber(request, response) {
        const { id, phone } = request.body;

        try {
            const user = await User.updateOne({ "_id": id }, { "numero_celular": phone });
            return response.status(200).json({ user });
        } catch (e) {
            return response.status(400).json({ error: "Não foi possível atualizar o telefone, tente novamente mais tarde!" });
        }
    },
}