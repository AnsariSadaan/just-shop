import express from 'express';
import useSignUpController from '../controllers/userSignUp.js';
import userSignInController from '../controllers/userSignIn.js';
import userDetailsController from '../controllers/userDetails.js';
import authToken from '../middlewares/authToken.js';
import userLogout from '../controllers/userLogout.js';


const router = express.Router();
router.post('/signup', useSignUpController);
router.post('/signin', userSignInController); 
router.get('/user-details', authToken, userDetailsController);
router.get('/userLogout', userLogout);
export default router;