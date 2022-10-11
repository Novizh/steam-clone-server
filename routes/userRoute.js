const express = require('express');
const route = express.Router();
const UserController = require('../controllers/userController');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/userAuthorization');

route.post(`/register`, UserController.register);
route.post(`/login`, UserController.login);

route.use(authentication);
route.get(`/`, UserController.getAllUsers);
route.get(`/:id`, UserController.getUserById);
route.put(`/:id`, authorization, UserController.updateUser);
route.delete(`/:id`, authorization, UserController.deleteUser);

module.exports = route;