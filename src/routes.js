const { Router } = require('express');
const routes = Router();
const PadariaServices = require('./services/PadariaServices');
const ApiValidations = require('./services/utils/ApiValidations');
const PadariaServicesUtils = require('./services/PadariaServicesUtils');

routes.post('/insertBakery', ApiValidations.validateBakeryInsertion(), PadariaServices.insertBakery);

routes.get('/listBakery', PadariaServices.listBakery);

routes.get('/listBakeryByName', ApiValidations.listBakeryByName(), PadariaServices.listBakeryByName);

routes.post('/bakeryLogin', ApiValidations.bakeryLogin(), PadariaServices.bakeryLogin);

routes.get('/listByLocation', ApiValidations.listByLocation(), PadariaServices.listByLocation);

routes.post('/updateLastBatch', ApiValidations.updateLastBatch(), PadariaServicesUtils.updateLastBatch);

routes.post('/updateOpenedOrClosed', ApiValidations.updateOpenedOrClosed(), PadariaServicesUtils.updateOpenedOrClosed);

routes.post('/updatePassword', ApiValidations.updatePassword(), PadariaServicesUtils.updatePassword);

routes.post('/forgotPassword', ApiValidations.forgotPassword(), PadariaServicesUtils.forgotPassword);

module.exports = routes;