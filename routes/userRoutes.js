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


router.route('/').get(authenticateUser,authorizePermissions,getAllUsers);

router.route('/showMe').get(showCurrentUser);

router.route('/updateUser').patch(updateUser);

router.route('/updatePassword').patch(updateUserPassWord);

router.route('/:id',).get(getSingleUser);


module.exports = router;