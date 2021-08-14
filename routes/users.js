const express = require('express');
const route = express.Router();

const UserController = require('../controllers/userController');

route.post(`/register`, UserController.register);
route.post(`/login`, UserController.login);
route.get(`/`, UserController.getAll);
route.get(`/:id`, UserController.getById);
route.put(`/:id`, UserController.update);
route.delete(`/:id`, UserController.delete);

module.exports = route;