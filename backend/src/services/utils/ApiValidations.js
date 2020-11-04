const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {
    validateBakeryInsertion() {
        return celebrate({
            [Segments.BODY]: Joi.object().keys({
                nome: Joi.string().required(),
                email: Joi.string().required().email(),
                senha: Joi.string().required().min(4),
                numero_celular: Joi.string().length(11),
                numero_telefone: Joi.string().optional().length(10),
                cnpj: Joi.string().length(14),
                aberto_fechado: Joi.boolean().required(),
                ultima_fornada: Joi.date().optional(),
                cep: Joi.string().length(8),
                rua: Joi.string().required(),
                numero: Joi.string().required(),
                bairro: Joi.string().required(),
                cidade: Joi.string().required(),
                estado: Joi.string().required(),
                ibge: Joi.string().optional(),
                gia: Joi.string().optional(),
                latitude: Joi.number(),
                longitude: Joi.number(),
                tempo_espera: Joi.date().optional(),
            }),
        });
    },

    listBakeryByName() {
        return celebrate({
            [Segments.QUERY]: Joi.object().keys({
                nome: Joi.string().required(),
            }),
        });
    },

    listBakeryByIds() {
        return celebrate({
            [Segments.BODY]: Joi.object().keys({
                idList: Joi.required(),
            }),
        });
    },

    getBakeryById() {
        return celebrate({
            [Segments.QUERY]: Joi.object().keys({
                _id: Joi.string().required(),
            }),
        });
    },

    findBakeryByCNPJ() {
        return celebrate({
            [Segments.QUERY]: Joi.object().keys({
                cnpj: Joi.string().required().length(14),
            }),
        });
    },

    bakeryLogin() {
        return celebrate({
            [Segments.BODY]: Joi.object().keys({
                cnpj: Joi.string().required().length(14),
                senha: Joi.string().required(),
            }),
        });
    },

    listByLocation() {
        return celebrate({
            [Segments.QUERY]: Joi.object().keys({
                latitude: Joi.number().required(),
                longitude: Joi.number().required(),
            }),
        });
    },

    updateOpenedOrClosed() {
        return celebrate({
            [Segments.QUERY]: Joi.object().keys({
                _id: Joi.string().required(),
            }),
            [Segments.BODY]: Joi.object().keys({
                aberto_fechado: Joi.boolean().required(),
            }),
        });
    },

    updateLastBatch() {
        return celebrate({
            [Segments.QUERY]: Joi.object().keys({
                _id: Joi.string().required(),
            }),
            [Segments.BODY]: Joi.object().keys({
                ultima_fornada: Joi.date().required(),
            }),
        });
    },

    updatePassword() {
        return celebrate({
            [Segments.BODY]: Joi.object().keys({
                _id: Joi.string().required(),
                email: Joi.string().email().required(),
                novaSenha: Joi.string().required().min(4),
            }),
        });
    },

    forgotPassword() {
        return celebrate({
            [Segments.BODY]: Joi.object().keys({
                cnpj: Joi.string().required().length(14),
            }),
        });
    },

    bakeryToken() {
        return celebrate({
            [Segments.HEADERS]: Joi.object().keys({
                token: Joi.required(),
            }),
        });
    },

    updateBakeryAddress() {
        return celebrate({
            [Segments.QUERY]: Joi.object().keys({
                _id: Joi.string().required(),
            }),
            [Segments.BODY]: Joi.object().keys({
                cep: Joi.string().required().length(8),
                rua: Joi.string().required(),
                bairro: Joi.string().required(),
                estado: Joi.string().required(),
                cidade: Joi.string().required(),
                numero: Joi.string().required(),
                latitude: Joi.number(),
                longitude: Joi.number(),
            }),
        });
    },

    updatePhoneNumber() {
        return celebrate({
            [Segments.QUERY]: Joi.object().keys({
                _id: Joi.string().required(),
            }),
            [Segments.BODY]: Joi.object().keys({
                numero_celular: Joi.string().length(11).required(),
                numero_telefone: Joi.string().length(10).optional(),
            }),
        });
    },

    getAddressByCep() {
        return celebrate({
            [Segments.BODY]: Joi.object().keys({
                cep: Joi.string().required().length(8),
                numero: Joi.string().required(),
                _id: Joi.string().optional(),
            }),
        });
    },

    getCnpjFromWs() {
        return celebrate({
            [Segments.QUERY]: Joi.object().keys({
                cnpj: Joi.string().required(),
            }),
        });
    },

    findBakeryByEmail() {
        return celebrate({
            [Segments.BODY]: Joi.object().keys({
                email: Joi.string().required(),
            }),
        });
    },
};