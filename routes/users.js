const express = require('express');
const route = express.Router();

const UserController = require('../controllers/userController');

route.get(`/`, UserController.getAll);
route.get(`/:id`, UserController.getById);
route.post(`/`, UserController.create);
route.put(`/:id`, UserController.update);
route.delete(`/:id`, UserController.delete);

module.exports = route;