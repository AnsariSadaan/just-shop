import express from 'express';
import useSignUpController from '../controllers/userSignUp.js';


const router = express.Router();
router.post('/signup', useSignUpController) 
export default router;