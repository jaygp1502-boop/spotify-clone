import 'dotenv/config';
import connectDb from './src/config/mongodb.js';
import adminModel from './src/models/adminModel.js';

const seedAdmin = async () => {
    try {
        await connectDb();
        console.log("Connected to MongoDB...");

        const username = process.env.ADMIN_USERNAME || 'Adminuser';
        const password = process.env.ADMIN_PASSWORD || 'Adminpass';
        const name = process.env.ADMIN_NAME || 'Soundify Admin';
        const role = process.env.ADMIN_ROLE || 'Admin';

        let admin = await adminModel.findOne({ username });
        if (admin) {
            admin.password = password;
            admin.name = name;
            admin.role = role;
            await admin.save();
            console.log(`Updated existing admin '${username}'.`);
        } else {
            admin = await adminModel.create({
                username,
                password,
                name,
                role,
            });
            console.log(`Created new admin '${username}'.`);
        }

        console.log("Admin details in database:");
        console.log({
            id: admin._id,
            username: admin.username,
            name: admin.name,
            role: admin.role,
        });

        process.exit(0);
    } catch (error) {
        console.error("Error seeding admin:", error);
        process.exit(1);
    }
};

seedAdmin();
