const { Router } = require('express');
const routes = Router();
const PadariaServices = require('./services/PadariaServices');
const ApiValidations = require('./services/utils/ApiValidations');

routes.post('/insertBakery', ApiValidations.validateBakeryInsertion, PadariaServices.insertBakery);

routes.get('/listBakery', PadariaServices.listBakery);

routes.get('/listBakeryByName', ApiValidations.listBakeryByName, PadariaServices.listBakeryByName);

routes.post('/bakeryLogin', ApiValidations.bakeryLogin, PadariaServices.bakeryLogin);

routes.get('/listByLocation', ApiValidations.listByLocation, PadariaServices.listByLocation);

module.exports = routes;