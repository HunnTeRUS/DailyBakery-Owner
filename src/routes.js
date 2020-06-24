const { Router } = require('express');
const routes = Router();
const PadariaServices = require('./services/PadariaServices');

routes.post('/insertBakery', PadariaServices.insertBakery);
routes.delete('/deleteBakery', PadariaServices.deleteBakery);
routes.get('/listBakery', PadariaServices.listBakery);

module.exports = routes;