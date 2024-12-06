import express from 'express';
import { register, login, forgotPassword, resetPassword, verifyEmail } from '../controllers/auth.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', authLimiter, login);
router.post('/forgot-password', authLimiter, forgotPassword);
router.patch('/reset-password/:token', resetPassword);
router.get('/verify/:token', verifyEmail);

export default router;