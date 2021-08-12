if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const app = express();
const { connect } = require('./config/database');
const PORT = process.env.PORT || 3001;
const routes = require('./routes');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(routes);
app.use(errorHandler);

connect()
    .then(() => {
        console.log(`Connected successfully!`);
        app.listen(PORT, () => {
            console.log(`This app is running on port ${PORT}`);
        })
    })
    .catch((error) => {
        console.log(error);
    })
