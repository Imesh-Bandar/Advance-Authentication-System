import express from 'express';
import { loginController, logoutController, signupController } from '../controller/auth.controller.js';

const router = express.Router();


router.get('/signup', signupController);
router.get('/login', loginController)
router.get('/logout', logoutController)

export default router;





