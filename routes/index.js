const express = require('express');
const app = express();
const userRoutes = require('./users');

app.get(`/`, (request, response) => {
    response.status(200).json({
        message: `Welcome to GamerFella Server!`
    });
});
app.use(`/users`, userRoutes);

module.exports = app;