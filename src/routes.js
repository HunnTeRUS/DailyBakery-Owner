const { Router } = require('express');
const routes = Router();
const PadariaServices = require('./services/PadariaServices');
const ApiValidations = require('./services/utils/ApiValidations');
const PadariaServicesUtils = require('./services/PadariaServicesUtils');
const VerifyToken = require('./services/Authentication/VerifyToken');

routes.post('/insertBakery', VerifyToken, ApiValidations.validateBakeryInsertion(), PadariaServices.insertBakery);

routes.get('/listBakery', PadariaServices.listBakery);

routes.get('/listBakeryByName', ApiValidations.listBakeryByName(), PadariaServices.listBakeryByName);

routes.post('/bakeryLogin', ApiValidations.bakeryLogin(), PadariaServices.bakeryLogin);

routes.get('/listByLocation', ApiValidations.listByLocation(), PadariaServices.listByLocation);

routes.get('/findBakeryByCNPJ', ApiValidations.findBakeryByCNPJ(), PadariaServices.findBakeryByCNPJ);

routes.post('/updateLastBatch', VerifyToken, ApiValidations.updateLastBatch(), PadariaServicesUtils.updateLastBatch);

routes.post('/updateOpenedOrClosed', VerifyToken, ApiValidations.updateOpenedOrClosed(), PadariaServicesUtils.updateOpenedOrClosed);

routes.post('/updatePassword', ApiValidations.updatePassword(), PadariaServicesUtils.updatePassword);

routes.post('/forgotPassword', ApiValidations.forgotPassword(), PadariaServicesUtils.forgotPassword);

routes.post('/updatePhoneNumber', ApiValidations.updatePhoneNumber(), PadariaServicesUtils.updatePhoneNumber);

routes.post('/updateBakeryAddress', ApiValidations.updateBakeryAddress(), PadariaServicesUtils.updateAddress);

module.exports = routes;