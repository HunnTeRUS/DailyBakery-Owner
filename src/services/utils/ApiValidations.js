const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {
    validateBakeryInsertion(){
        return celebrate({
            [Segments.BODY]: Joi.object().keys({
                nome: Joi.string().required(),
                email: Joi.string().required().email(),
                senha: Joi.string().required().min(4),
                numero_celular: Joi.string().length(11),
                numero_telefone: Joi.string().length(10),
                cnpj: Joi.string().length(14),
                aberto_fechado: Joi.boolean().required(),
                ultima_fornada: Joi.date(),
                cep: Joi.string().length(8),
                rua: Joi.string().required(),
                numero: Joi.string().required(),
                bairro: Joi.string().required(),
                cidade: Joi.string().required(),
                estado: Joi.string().requires(),
                ibge: Joi.string().optional(),
                gia: Joi.string().optional(),
                latitude: Joi.number(),
                longitude: Joi.number()
            })
        });
    }, 

    listBakeryByName(){
        return celebrate({
            [Segments.QUERY]: Joi.object().keys({
                nome: Joi.string().required()
            })
        });
    },

    bakeryLogin(){
        return celebrate({
            [Segments.BODY]: Joi.object().keys({
                cnpj: Joi.string().required(),
                senha: Joi.string().required(), 
            })
        });
    },

    listByLocation(){
        return celebrate({
            [Segments.QUERY]: Joi.object().keys({
                latitude: Joi.number().required(),
                longitude: Joi.number().required(),
            })
        })
    }

}