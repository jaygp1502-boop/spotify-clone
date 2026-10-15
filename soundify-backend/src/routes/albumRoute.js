import express from 'express'
import {addAlbum, listAlbum, removeAlbum, searchAlbum } from '../controllers/albumController.js'
import upload from '../middleware/multer.js'

const albumRouter = express.Router();

albumRouter.post('/add', upload.single('image'), addAlbum);
albumRouter.get('/list', listAlbum);
albumRouter.get('/search', searchAlbum);
albumRouter.get('/search/:query', searchAlbum);
albumRouter.post('/remove', removeAlbum);

export default albumRouter;