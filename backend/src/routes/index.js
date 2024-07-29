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
import categoryWiseProductController from '../controllers/product/getCategoryWiseProduct.js';
import getProductDetailsController from '../controllers/product/getProductDetails.js';
import categoryProductController from '../controllers/product/getSingleCategoryProduct.js';
import addToCartController from '../controllers/user/addToCart.js';
import countAddToCartProduct from '../controllers/user/countAddToCartProduct.js';
import addToCartViewProductController from '../controllers/product/addToCartViewProduct.js';
import updateAddToCartController from '../controllers/user/updateAddToCart.js';
import deleteCartProductController from '../controllers/user/deleteCartProduct.js';



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

// get category wise Product
router.post('/category-product', categoryWiseProductController);
router.post('/product-details', getProductDetailsController);

//user add to cart
router.post('/addtocart', authToken ,addToCartController);
router.get('/countAddToCartProduct', authToken, countAddToCartProduct);
router.get('/view-cart-product', authToken, addToCartViewProductController);
router.post('/update-cart-product', authToken, updateAddToCartController);
router.post('/delete-cart-product', authToken, deleteCartProductController);
export default router;