const express = require('express');
const router = express.Router();
const {authenticateUser,authorizePermissions} = require('../middleware/authentication');

const {
    createProducts,
    getAllProducts,
    getSingleProduct,
    deleteProduct,
    updateProduct,
    uploadImage
}= require('../controllers/productController');

const {getSingleProductReviews} = require('../controllers/reviewController')



router.route('/').post([authenticateUser,authorizePermissions('admin')],createProducts);

router.route('/').get(getAllProducts);

router.route('/uploadImage').post([authenticateUser,authorizePermissions('admin')],uploadImage)

router
   .route('/:id')
   .get(getSingleProduct)
   .patch([authenticateUser,authorizePermissions('admin')],updateProduct)
   .delete([authenticateUser,authorizePermissions('admin')],deleteProduct)

router.route('/:id/reviews').get(getSingleProductReviews);

module.exports = router;
  