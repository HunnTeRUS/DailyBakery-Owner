var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var handlebars = require('handlebars');
var fs = require('fs');

require('dotenv').config('../../../.env');

function gerarPassword() {
    return Math.random().toString(36).slice(-10);
}

var remetente = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: String(process.env.EMAIL),
        pass: String(process.env.EMAIL_PASS)
    }
});

var readHTMLFile = function(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};



module.exports = {
    sendNewPasswordCodeByEmail(email) {
        
        var code = gerarPassword();

        readHTMLFile('src/templates/emails/forgotPassword/forgotPass.html', function(err, html) {
            var template = handlebars.compile(html);
            var replacements = {
                 code: code
            };
            var htmlToSend = template(replacements);
            var mailOptions = {
                from: String(process.env.EMAIL),
                to: email,
                subject: 'Codigo para atualização de senha',
                html : htmlToSend
             };
            remetente.sendMail(mailOptions, function (error, response) {
                if (error) {
                    console.log(error);
                    callback(error);
                }
            });
            
        });
                
        return code;
    }
}

