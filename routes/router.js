import express from 'express';
import {
    home,
    signin,
    signup,
    logout,
    loginPipe,
    registerPipe,
    beachesPage,
    accessBeachPipeLine,
    adminPipeLine
} from './piplines.js';
import { Api } from '../api/api.js';

export const router = express.Router();

// routes
router.get('/', home);
router.get('/Beaches', beachesPage);
router.get('/beach/:id', accessBeachPipeLine);
router.get('/admin', adminPipeLine);

router.get('/signin', signin);
router.post('/logingIn', loginPipe);
router.post('/registeruser', registerPipe);
router.get('/signup', signup);
router.get('/logout', logout);

router.post('/api/addlike', Api.addLike);
router.post('/api/removelike', Api.removeLike);
router.post('/api/addcomment', Api.addComment);
router.post('/api/addpost', Api.addPost);

// testing
router.get('/api/test', Api.test);
