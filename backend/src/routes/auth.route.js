import express from 'express';
import { checkAuth, login, logout, singup, updateProfile } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/login', login)
router.post('/singup', singup);
router.post('/logout', logout);
router.get('/check', checkAuth);

// TODO: ancora da implementare
router.put('/update-profile', updateProfile);

export default router;
