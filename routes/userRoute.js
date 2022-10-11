const express = require('express');
const route = express.Router();
const UserController = require('../controllers/userController');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

route.post(`/register`, UserController.register);
route.post(`/login`, UserController.login);

route.use(authentication);
route.get(`/`, UserController.getAllUsers);
route.get(`/:id`, UserController.getUserById);
route.use(authorization);
route.put(`/:id`, UserController.updateUser);
route.delete(`/:id`, UserController.deleteUser);

module.exports = route;