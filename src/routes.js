const { Router } = require('express');
const routes = Router();
const PadariaServices = require('./services/PadariaServices');

routes.get('/teste');

module.exports = routes;