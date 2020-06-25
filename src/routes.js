const { Router } = require('express');
const routes = Router();
const PadariaServices = require('./services/PadariaServices');

routes.post('/insertBakery', PadariaServices.insertBakery);
routes.get('/listBakery', PadariaServices.listBakery);
routes.get('/listBakeryByName', PadariaServices.listBakeryByName);
routes.post('/bakeryLogin', PadariaServices.bakeryLogin);


module.exports = routes;