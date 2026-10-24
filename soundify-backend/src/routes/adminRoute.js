import express from 'express';
import {
    adminLogin,
    verifyAdmin,
    createOrUpdateAdmin,
} from '../controllers/adminController.js';

const adminRouter = express.Router();

adminRouter.post('/login', adminLogin);
adminRouter.get('/verify', verifyAdmin);
adminRouter.post('/save', createOrUpdateAdmin);

export default adminRouter;
