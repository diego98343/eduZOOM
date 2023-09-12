const express = require('express');
const router = express.Router();
const {authenticateUser,authorizePermissions} = require('../middleware/authentication');

const {
    createOder,
    getAllOrders,
    getSingleOrder,
    updateOrder,
    deleteOrder,
    getCurrentUserOrders
}= require('../controllers/orderController');


router
   .route('/')
   .post(authenticateUser,createOder)
   .get(authenticateUser,authorizePermissions('admin'),getAllOrders);




router
    .route('/showAllMyOrders').get(authenticateUser,getCurrentUserOrders);

router
   .route('/:id')
   .get(authenticateUser,getSingleOrder)
   .patch(authenticateUser,updateOrder)


module.exports = router