// Environment
require('dotenv').config();

// Modules
const app = require('../app');
const port = process.env.PORT;
const { connect } = require('../config/database');
const http = require('http');
const server = http.createServer(app);

connect()
    .then(() => {
        console.log(`Connected successfully!`);
        server.listen(port, () => {
            console.log(`This app is running on port ${port}`);
        })
    })
    .catch((error) => {
        console.log(error);
    })