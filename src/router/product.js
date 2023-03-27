const express = require('express');
const route = express.Router();

const productController = require('../app/controller/productController');

route.get('/addProduct', productController.add);
route.put('/:id',productController.update);
route.delete('/:id', productController.destroy);
route.post('/list', productController.list);
route.get('/', productController.product);


module.exports = route;