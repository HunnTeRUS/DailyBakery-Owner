var express = require('express');

const app = express();

app.get('/teste', (request, response) => {
    
    return response.send({
        kkeaimen: "eaemen kk"
    })
})


app.listen(3333);