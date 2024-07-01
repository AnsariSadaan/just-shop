import express from 'express';
import useSignUpController from '../controllers/userSignUp.js';
import userSignInController from '../controllers/userSignIn.js';


const router = express.Router();
router.post('/signup', useSignUpController);
router.post('/signin', userSignInController); 
export default router;