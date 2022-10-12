const MongoClient = require("mongodb").MongoClient;
const { hash } = require('../helpers/bcrypt');
require('dotenv').config();

// Run this function to seed the database
async function seedDatabase() {
    try {
        const url = `mongodb://localhost:27017`;
        const client = new MongoClient(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        await client.connect();
        // Drop users collection if it exists
        const collection = client.db("steam-clone-db").collection("users");
        collection.drop();
        // Define and insert admin user to the empty collection
        let user = {
            username: process.env.ADMIN_USERNAME,
            email: process.env.ADMIN_EMAIL,
            password: hash(process.env.ADMIN_PASSWORD),
            role: 1 // Admin role
        }
        collection.insertOne(user);
        console.log("Database seeded!");
    } catch (error) {
        console.log(error.stack);
    }
}

seedDatabase();