const MongoClient = require("mongodb").MongoClient;
const { hash } = require('../middlewares/bcrypt');

async function seedDB() {
    // Connection URL
    const uri = `mongodb://localhost:27017`;
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    try {
        await client.connect();
        const collection = client.db("steam-clone-db").collection("users");
        
        // The drop() command destroys all data from a collection.
        collection.drop();
        // Create the first user
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