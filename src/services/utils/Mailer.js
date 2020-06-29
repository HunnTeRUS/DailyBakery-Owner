var nodemailer = require('nodemailer');

require('dotenv').config('../../../.env');

var remetente = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: String(process.env.EMAIL),
        pass: String(process.env.EMAIL_PASS)
    }
});

function gerarPassword() {
    return Math.random().toString(36).slice(-10);
}

module.exports = {
    sendNewPasswordCodeByEmail(email) {
        const codigoaenviar = gerarPassword();

        var emailASerEnviado = {
            from: String(process.env.EMAIL),
            to: email,
            subject: 'Codigo para atualização de senha',
            text: `O codigo para alterar sua senha no app DailyBakery Owner é esse: ${codigoaenviar}`,
        };

        remetente.sendMail(emailASerEnviado, function (error) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email enviado com sucesso');
            }
        });

        return codigoaenviar;
    }
}

