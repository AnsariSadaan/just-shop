import express from 'express';
import useSignUpController from '../controllers/user/userSignUp.js';
import userSignInController from '../controllers/user/userSignIn.js';
import userDetailsController from '../controllers/user/userDetails.js';
import authToken from '../middlewares/authToken.js';
import userLogout from '../controllers/user/userLogout.js';
import UpdateUserRole from '../controllers/user/UpdateUserRole.js';
import uploadProductController from '../controllers/product/uploadProduct.js';
import getProductController from '../controllers/product/getProduct.js';
import updateProductController from '../controllers/product/updateProduct.js';
import AllUsers from '../controllers/user/AllUsers.js';
import categoryProductController from '../controllers/product/getCtaegoryProduct.js';


const router = express.Router();
router.post('/signup', useSignUpController);
router.post('/signin', userSignInController);
router.get('/user-details', authToken, userDetailsController);
router.get('/userLogout', userLogout);

// admin panel 
router.get('/all-users', authToken, AllUsers);
router.post('/update-user', authToken, UpdateUserRole)


//Product
router.post('/upload-product', authToken, uploadProductController);

//get product 
router.get('/get-product', getProductController);
router.post('/update-product', authToken, updateProductController);

router.get('/get-categoryProduct', categoryProductController);
export default router;