import express from 'express';
import { loginController, logoutController, signupController, verificationEmail, forgotPasswordController, resetPassword, checkAuth } from '../controller/auth.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';
const router = express.Router();

router.get('/check-auth', verifyToken, checkAuth)
router.post('/signup', signupController);
router.post('/login', loginController)
router.post('/logout', logoutController)
router.post('/verification-email', verificationEmail);
router.post('/forgot-password', forgotPasswordController);
router.get('/reset-password/:token', resetPassword);

export default router;





