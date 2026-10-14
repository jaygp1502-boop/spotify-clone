import mongoose from 'mongoose';
import dns from 'node:dns';

dns.setServers(['8.8.8.8', '1.1.1.1']);

const connectDb = async () => {

    mongoose.connection.on('connected', () => {
        console.log("Connection established");
    });

    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/soundify`);
    } catch (error) {
        console.log("MongoDB connection error:");
        console.log(error);
    }
}

export default connectDb;