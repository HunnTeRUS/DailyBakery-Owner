const { Router } = require('express');
const routes = Router();
const PadariaServices = require('./services/PadariaServices');
const ApiValidations = require('./services/utils/ApiValidations');
const PadariaServicesUtils = require('./services/PadariaServicesUtils');
const VerifyToken = require('./services/Authentication/VerifyToken');

routes.post('/insertBakery', ApiValidations.validateBakeryInsertion(), PadariaServices.insertBakery);

routes.get('/listBakery', PadariaServices.listBakery);

routes.get('/listBakeryByName', ApiValidations.listBakeryByName(), PadariaServices.listBakeryByName);

routes.post('/bakeryLogin', ApiValidations.bakeryLogin(), PadariaServices.bakeryLogin);

routes.get('/listByLocation', ApiValidations.listByLocation(), PadariaServices.listByLocation);

routes.get('/findBakeryByCNPJ', ApiValidations.findBakeryByCNPJ(), PadariaServices.findBakeryByCNPJ);

routes.put('/updateLastBatch', VerifyToken, ApiValidations.updateLastBatch(), PadariaServicesUtils.updateLastBatch);

routes.put('/updateOpenedOrClosed', VerifyToken, ApiValidations.updateOpenedOrClosed(), PadariaServicesUtils.updateOpenedOrClosed);

routes.post('/updatePassword', ApiValidations.updatePassword(), PadariaServicesUtils.updatePassword);

routes.post('/forgotPassword', ApiValidations.forgotPassword(), PadariaServicesUtils.forgotPassword);

routes.put('/updatePhoneNumber', VerifyToken, ApiValidations.updatePhoneNumber(), PadariaServicesUtils.updatePhoneNumber);

routes.put('/updateBakeryAddress', VerifyToken, ApiValidations.updateBakeryAddress(), PadariaServicesUtils.updateAddress);

routes.get('/getAddressByCep', ApiValidations.getAddressByCep(), PadariaServicesUtils.getAddressByCep);

routes.get('/verifyCnpj', ApiValidations.getCnpjFromWs(), PadariaServicesUtils.getCnpjFromWs);

module.exports = routes;