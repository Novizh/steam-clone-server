const express = require('express');
const app = express();
const userRoutes = require('./users');
const gameRoutes = require('./game');

app.get(`/`, (request, response) => {
    response.status(200).json({
        message: `Welcome to GamerFella Server!`
    });
});
app.use(`/users`, userRoutes);
app.use(`/wishlist`, gameRoutes);

module.exports = app;