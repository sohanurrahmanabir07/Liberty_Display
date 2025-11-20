const mongoose = require('mongoose');
require('dotenv').config();

let gridFSBucket; // Declare it here but initialize inside function

const ConnnectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MongoDB_URL);

        console.log('MongoDB connected successfully');

    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1); // Exit process on failure
    }
};

// **Make sure GridFSBucket is accessible after initialization**
const getGridFSBucket = () => {
    if (!gridFSBucket) throw new Error("GridFSBucket is not initialized yet!");
    return gridFSBucket;
};

module.exports = { ConnnectDB, getGridFSBucket };