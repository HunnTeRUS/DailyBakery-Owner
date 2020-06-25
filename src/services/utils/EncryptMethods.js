// Nodejs encryption with CTR
const crypto = require('crypto');

require('dotenv').config('../../../.env');
const pass = process.env.ENCRYPT_PASSWORD;

const algorithm = 'aes-256-ctr';
const password = pass;

module.exports = {
    encrypt(text) {
        var cipher = crypto.createCipher(algorithm, password)
        var crypted = cipher.update(text, 'utf8', 'hex')
        crypted += cipher.final('hex');
        return crypted;
    },

    decrypt(text) {
        var decipher = crypto.createDecipher(algorithm, password)
        var dec = decipher.update(text, 'hex', 'utf8')
        dec += decipher.final('utf8');
        return dec;
    }
};