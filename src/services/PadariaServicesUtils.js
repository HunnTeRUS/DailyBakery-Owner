const Padaria = require('../models/Padaria');
const cryp = require('./utils/EncryptMethods')
let PadariaDTO = require('../models/dto/PadariaDTO');

module.exports = {

    //Altera o horario/dia da ultima fornada
    async updateLastBatch(request, response) {
        const { ultima_fornada } = request.body;
        const { cnpj } = request.query;
        let updated;

        try{
            await Padaria.updateOne({ "cnpj": cnpj }, { "ultima_fornada": ultima_fornada });

            updated = await Padaria.findOne({ "cnpj": cnpj });

            if(!updated){
                return response.status(400).json({Erro: "CNPJ incorreto"});
            }

        } catch(e) {
            return response.status(400).json(e);
        }

        return response.json(updated);
    },

    //Altera o status da padaria: aberto/fechado
    async updateOpenedOrClosed(request, response) {
        const {  cnpj } = request.query;
        const { aberto_fechado } = request.body;
        let updated; 
        
        try{
            await Padaria.updateOne({ cnpj: cnpj }, { aberto_fechado: aberto_fechado });
            
            updated = await Padaria.findOne({ "cnpj": cnpj });

            if(!updated){
                return response.status(400).json({Erro: "CNPJ incorreto"});
            }
        } catch(e) {
            return response.status(400).json(e);
        }

        return response.json(updated);
    }

}