require('dotenv').config('../../../.env');

const credentials = {
    id: process.env.ACCESS_KEY_ID,
    secret: process.env.SECRET_ACCESS_KEY
}

var AWS = require("aws-sdk")

AWS.config.update({region: ""});

var params = {
    attributes: {
        'DefaultSMSType': "Transactional"
    }
};

var setSMSTypePromise = new AWS.SNS({apiVersion: "2010-03-31"}).setSMSAttributes(params).promise();

setSMSTypePromise.then(
    function(data){
        console.log(data)
    }
).catch(
    function(err) {
        console.error(err, err.stack)
    }
)