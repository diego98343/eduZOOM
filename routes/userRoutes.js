const express = require('express');
const router = express.Router();

const {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassWord
      } = require('../controllers/userController')


router.route('/').get(getAllUsers);

router.route('/showMe').get(showCurrentUser);

router.route('/updateUser').post(updateUser);

router.route('/updatePassword').post(updateUserPassWord);

router.route('/:id',).get(getSingleUser);


module.exports = router;