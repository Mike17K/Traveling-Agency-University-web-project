import express from 'express';
import {
    home,
    signin,
    signup,
    logout,
    loginPipe,
    registerPipe,
    beachesPage,
    accessBeachPipeLine
} from './piplines.js';

export const router = express.Router();

// routes
router.get('/', home);
router.get('/Beaches', beachesPage);
router.get('/beach', accessBeachPipeLine);

router.get('/signin', signin);
router.post('/logingIn', loginPipe);
router.post('/registeruser', registerPipe);
router.get('/signup', signup);
router.get('/logout', logout);
