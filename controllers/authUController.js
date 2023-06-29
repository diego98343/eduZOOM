const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const jwt = require('jsonwebtoken');
const {createJWT} = require('../utils/jwt')

const register = async (req,res) =>{

    const {email, name, password} = req.body;

    //THIS CHECK IF THERE IS AN EMAIL ALREADY CREATED
    const emailAlreadyExist = await User.findOne({email});
    if(emailAlreadyExist){
        throw new CustomError.BadRequestError('Email already exist please try another one')
    }
    //-----------------------------------------------------------------------------------------

    //THIS MAKE SURE THE FIRST USER IS THE ADMIN
    const isFirstAccount = (await User.countDocuments({})) === 0
    const role = isFirstAccount ? 'admin' : 'user';
    //-------------------------------------------------------------

    //CREATE NEW USER AND STORE IT TO THE DATABASE
    const user = await User.create({name,email,password,role});

    // JWT AUTH PART// we must create this tokenUser
    const tokenUser = {name:user.name,userId:user._id,role:user.role}
    const token =  createJWT({payload:tokenUser})
    //------------------------------------------------------------

    //SETUP COOKIE
    const oneDay = 1000 *60 *60 *24
    res.cookie('token',token,{httpOnly:true,expires: new Date(Date.now()+ oneDay)})
    //-------------------------------------------------------------------------------

    res.status(StatusCodes.CREATED).json({user:tokenUser,token});  
}


const login = async (req,res) =>{
    res.send('login user');
}


const logout = async (req,res) =>{
    res.send('logout user ');
}


module.exports = {
    register,
    login,
    logout
}