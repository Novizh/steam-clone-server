const express = require('express');
const route = express.Router();
const UserController = require('../controllers/userController');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

route.post(`/register`, UserController.register);
route.post(`/login`, UserController.login);

route.use(authentication);
route.get(`/`, UserController.getAll);
route.get(`/:id`, UserController.getById);
route.put(`/:id`, UserController.update);
route.delete(`/:id`, UserController.delete);

module.exports = route;