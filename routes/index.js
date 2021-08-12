const express = require('express');
const app = express();
// import routes here

app.get(`/`, (request, response) => {
    response.status(200).json({
        message: `Welcome to GamerFella Server!`
    })
})

module.exports = app;