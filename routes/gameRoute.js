const express = require('express');
const route = express.Router();
const GameController = require('../controllers/gameController');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/gameAuthorization');

route.use(authentication);
route.post(`/`, GameController.wishlist);
route.get(`/`, GameController.getAllWishlist);
route.get(`/:id`, GameController.getById);

route.use(`/:id`, authorization);
route.delete(`/:id`, GameController.removeWishlist);

module.exports = route;