const { MongoClient } = require('mongodb');

// MongoDB default uri port
const uri = `mongodb://localhost:27017`;
let database = null;

async function connect() {
    try {
        const client = new MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        client.connect();
        const db = await client.db('steam-clone-db');
        database = db;
        return db;
    } catch (error) {
        console.log(error);
    }
}

function getDatabase() {
    return database;
}1

module.exports = {
    connect,
    getDatabase
};