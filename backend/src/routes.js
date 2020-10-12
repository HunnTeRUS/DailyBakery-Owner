const { Router } = require('express');
const routes = Router();
const PadariaServices = require('./services/PadariaServices');
const UserService = requier('./services/UserService');
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

routes.post('/verifyToken', VerifyToken, PadariaServicesUtils.verifyToken);

routes.put('/updateBakeryAddress', VerifyToken, ApiValidations.updateBakeryAddress(), PadariaServicesUtils.updateAddress);

routes.post('/getAddressByCep', ApiValidations.getAddressByCep(), PadariaServicesUtils.getAddressByCep);

routes.get('/verifyCnpj', ApiValidations.getCnpjFromWs(), PadariaServicesUtils.getCnpjFromWs);


/*******************************************************************************************************************/


routes.post('/userRegister', ApiValidations.userRegister(), UserService.createUser);

routes.post('/userLogin', ApiValidations.loginUser(), UserService.loginUser);

routes.post('/userForgotPassword', ApiValidations.forgotPassword(), UserService.forgotPassword);

routes.put('/userUpdatePassword', ApiValidations.updatePassword(), UserService.updatePassword);

routes.put('/userUpdatePhoneNumber', ApiValidations.updatePhoneNumber(), UserService.updatePhoneNumber);

routes.put('/userUpdateName', ApiValidations.updateName(), UserService.updateName);

module.exports = routes;