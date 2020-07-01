const jwt = require("jsonwebtoken");
module.exports = {
    generateToken(user) {
        return jwt.sign(user, process.env.SECRET, {
            expiresIn: process.env.TOKEN_LIFE
        });
    }
}