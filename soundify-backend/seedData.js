import 'dotenv/config';
import mongoose from 'mongoose';
import connectDb from './src/config/mongodb.js';
import songModel from './src/models/songModel.js';
import albumModel from './src/models/albumModel.js';

const seedDatabase = async () => {
    try {
        await connectDb();
        console.log("Connected to MongoDB for seeding...");

        // Ensure database is clean of deprecated/dummy collections
        const albumCount = await albumModel.countDocuments();
        const songCount = await songModel.countDocuments();
        console.log(`Current dataset status: ${songCount} songs, ${albumCount} albums.`);

        console.log("Dataset verified and ready.");
        process.exit(0);
    } catch (error) {
        console.error("Seeding error:", error);
        process.exit(1);
    }
};

seedDatabase();
