const express = require('express');
const router = express.Router();
const {authenticateUser,authorizePermissions} = require('../middleware/authentication');
const {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassWord
      } = require('../controllers/userController')


router.route('/users').get(authenticateUser,authorizePermissions('admin'),getAllUsers);

router.route('/showMe').get(authenticateUser,showCurrentUser);

router.route('/updateUser').patch(authenticateUser,updateUser);

router.route('/updatePassword').patch(authenticateUser,updateUserPassWord);

router.route('/:id',).get(authenticateUser,getSingleUser);


module.exports = router;