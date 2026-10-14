import { v2 as cloudinary } from 'cloudinary'
import songModel from '../models/songModel.js';
const addSong = async (req, res) => {
    try {
        console.log("1. Request received");

        const name = req.body.name;
        const desc = req.body.desc;
        const album = req.body.album;

        console.log("2. Body received");
        console.log("Files:", req.files);

        const audioFile = req.files.audio[0];
        const imageFile = req.files.image[0];

        console.log("3. Audio:", audioFile.path);
        console.log("4. Image:", imageFile.path);

        console.log("5. Starting AUDIO upload...");

        const audioUpload = await cloudinary.uploader.upload(
            audioFile.path,
            {
                resource_type: "video"
            }
        );

        console.log("6. AUDIO upload completed");
        console.log(audioUpload.secure_url);

        console.log("7. Starting IMAGE upload...");

        const imageUpload = await cloudinary.uploader.upload(
            imageFile.path,
            {
                resource_type: "image"
            }
        );

        console.log("8. IMAGE upload completed");

        const duration =
            `${Math.floor(audioUpload.duration / 60)}:${Math.floor(audioUpload.duration % 60)}`;

        const songData = {
            name,
            desc,
            album,
            image: imageUpload.secure_url,
            file: audioUpload.secure_url,
            duration
        };

        console.log("9. Saving to MongoDB...");

        const song = songModel(songData);
        await song.save();

        console.log("10. Song saved");

        res.json({
            success: true,
            message: "Song Added"
        });

    } catch (error) {
        res.json({success: false});
    }
};
const listSong = async (req, res) => {
    try{
        const allsong = await songModel.find({});
        res.json({
            success: true,
            songs: allsong
        });
    }catch(error){
        res.json({success: false});
    }
}

const removeSong = async (req, res) => {
    try {
        await songModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message: "Song removed"});
    }catch(error){
        res.json({success: false});
    }
}

export { addSong, listSong, removeSong }