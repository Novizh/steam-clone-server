const MongoClient = require("mongodb").MongoClient;
const { hash } = require('../helpers/bcrypt');

async function seedDB() {
    const uri = `mongodb://localhost:27017`;
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    try {
        await client.connect();
        const collection = client.db("steam-clone-db").collection("users");
        
        collection.drop();
        
        let user = {
            username: 'Novizh',
            email: 'novizh@dev.com',
            password: hash('password')
        }
        collection.insertOne(user);
        
        console.log("Database seeded!");
    } catch (error) {
        console.log(error.stack);
    }
}

seedDB();