import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import songRouter from './src/routes/songRoute.js';
import connectDb from './src/config/mongodb.js';
import connectCloudinary from './src/config/cloudinary.js';
import albumRouter from './src/routes/albumRoute.js';
import songModel from './src/models/songModel.js';
import albumModel from './src/models/albumModel.js';

//App
const app = express();
const port = process.env.PORT || 4000;
connectDb();
connectCloudinary();


//Middleware
app.use(express.json());
app.use(cors());


//initializing route
app.use("/api/song",songRouter)
app.use("/api/album",albumRouter)

app.get('/api/search', async (req, res) => {
    try {
        const query = req.query.q || req.query.query || "";
        if (!query.trim()) {
            const songs = await songModel.find({});
            const albums = await albumModel.find({});
            return res.json({ success: true, songs, albums });
        }
        const regex = new RegExp(query.trim(), 'i');
        const songs = await songModel.find({
            $or: [
                { name: regex },
                { desc: regex },
                { album: regex }
            ]
        });
        const albums = await albumModel.find({
            $or: [
                { name: regex },
                { desc: regex }
            ]
        });
        res.json({ success: true, songs, albums });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

app.get('/',(req,res) => res.send("API Working"))

app.listen(port,() => console.log(`Server started on ${port}`))