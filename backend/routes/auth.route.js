import express from 'express';
import { loginController, logoutController, signupController,verificationEmail } from '../controller/auth.controller.js';

const router = express.Router();


router.post('/signup', signupController);
router.get('/login', loginController)
router.get('/logout', logoutController)
router.post('/verification-email', verificationEmail);

export default router;





