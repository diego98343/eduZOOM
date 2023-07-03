const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');




const getAllUsers = async(req, res)=>{

    //FIND THE USERS BASED ON ROLE
    const users = await User.find({role:'user'}).select('-password');
    res.status(StatusCodes.OK).json({users});

}


const getSingleUser = async(req, res)=>{

    const user = await User.findOne({_id:req.params.id}).select('-password');

    if(!user){
        throw new CustomError.NotFoundError('User not found');
    }
    res.status(StatusCodes.OK).json({user});
}


const showCurrentUser = async(req, res)=>{
    res.send('show current user')
}

const updateUser = async(req, res)=>{
    res.send('update user')
}


const updateUserPassWord = async(req, res)=>{
    res.send('update user password')
}


module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassWord
}


