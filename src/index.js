var express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');

//Criando uma instancia do express pra variavel app conduzir o sistema
const app = express();

//Conectando ao MongoDBAtlas (servidor mongo em cloud)

//Definir como json o corpo das requisiçções nas API's
app.use(express.json());

//Importando o arquivo de rotas da aplicação
app.use(routes);

//Qual porta a aplicalção esta usando
app.listen(3333);