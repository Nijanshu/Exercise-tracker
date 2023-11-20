const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI=process.env.mongoDBURI;


const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log(`Connected to MongoDB Successfully`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        // Optionally, you can throw the error to stop the application
        // throw error;
    }
};

module.exports = connectToMongo;