const { MongoClient } = require('mongodb');
const url = process.env.DATABASE_URL;
let database = null;

async function connect() {
    try {
        const client = new MongoClient(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        await client.connect();
        const db = await client.db('steam-clone-db');
        database = db;
        return db;
    } catch (error) {
        console.log(error);
        return error;
    }
}

function getDatabase() {
    return database;
}1

module.exports = {
    connect,
    getDatabase
};