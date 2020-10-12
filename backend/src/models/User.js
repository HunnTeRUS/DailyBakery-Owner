const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const PointSchema = require('./utils/PointSchema')

const UserSchema = mongoose.Schema({
    nome: String,
    email: String,
    senha: String,
    numero_celular: String,
});

UserSchema.methods = {
    generateToken(user) {
        return jwt.sign(user, process.env.SECRET, {
            expiresIn: 86400
        });
    }
};

module.exports = mongoose.model('Padaria', PadariaSchema);