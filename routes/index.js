const express = require('express');
const app = express();
const userRoutes = require('./userRoute');
const gameRoutes = require('./gameRoute');

app.get(`/`, (request, response) => {
    response.status(200).json({
        message: `Welcome to GamerFella Server!`
    });
});
app.use(`/user`, userRoutes);
app.use(`/wishlist`, gameRoutes);

module.exports = app;