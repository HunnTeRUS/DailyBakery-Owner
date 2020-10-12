const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {
    userRegister() {
        return celebrate({
            [Segments.BODY]: Joi.object().keys({
                nome: Joi.string().required(),
                email: Joi.string().required().email(),
                senha: Joi.string().required().min(4),
                numero_celular: Joi.string().required().length(11),
            }),
        });
    },

    loginUser() {
        return celebrate({
            [Segments.BODY]: Joi.object().keys({
                email: Joi.string().required().email(),
                senha: Joi.string().required().min(4),
            }),
        });
    },

    forgotPassword() {
        return celebrate({
            [Segments.BODY]: Joi.object().keys({
                email: Joi.string().required().email(),
            }),
        });
    },

    updatePassword() {
        return celebrate({
            [Segments.BODY]: Joi.object().keys({
                id: Joi.string().required(),
                senha: Joi.string().required().min(4),
            }),
        });
    },

    updatePhoneNumber() {
        return celebrate({
            [Segments.BODY]: Joi.object().keys({
                id: Joi.string().required(),
                numero_celular: Joi.string().required().min(11),
            }),
        });
    },

    updateName() {
        return celebrate({
            [Segments.BODY]: Joi.object().keys({
                id: Joi.string().required(),
                nome: Joi.string().required(),
            }),
        });
    },
}