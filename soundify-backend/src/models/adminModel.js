import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true, trim: true },
        password: { type: String, required: true },
        name: { type: String, default: 'Soundify Admin' },
        role: { type: String, default: 'Admin' },
    },
    { timestamps: true }
);

const adminModel = mongoose.models.admin || mongoose.model('admin', adminSchema);

export default adminModel;
