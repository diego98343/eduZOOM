const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const jwt = require('jsonwebtoken');
const {createJWT,attachCookiesToResponse} = require('../utils/jwt')
const { createTokenUser } = require('../utils');
const register = async (req,res) =>{

    const {email, name, password} = req.body;

    //THIS CHECK IF THERE IS AN EMAIL ALREADY CREATED
    const emailAlreadyExist = await User.findOne({email});
    if(emailAlreadyExist){
        throw new CustomError.BadRequestError('Email already exist please try another one');
    }
    //-----------------------------------------------------------------------------------------

    //THIS MAKE SURE THE FIRST USER IS THE ADMIN
    const isFirstAccount = (await User.countDocuments({})) === 0
    const role = isFirstAccount ? 'admin' : 'user';
    //-------------------------------------------------------------

    //CREATE NEW USER AND STORE IT IN THE DATABASE
    const user = await User.create({name,email,password,role});

    // JWT AUTH PART// we must create this tokenUser THE FUNCTION IS ON UTILs CREATETOKEN
    const tokenUser = createTokenUser(user);
                       
    // const token =  createJWT({payload:tokenUser})
    //------------------------------------------------------------

    //SETUP COOKIE
     attachCookiesToResponse({res,user:tokenUser});
    //-------------------------------------------------------------------------------

    //RESPONSE THAT SHOWS ON POSTMAN
    // res.status(StatusCodes.CREATED).json({user:tokenUser,token});  
}


const login = async (req,res) =>{


   const {email,password}= req.body;

   if(!email || !password){
    throw new CustomError.BadRequestError('Please provide email and password');
   }

     //FIND USER BASED ON EMAIL 
    const user = await User.findOne({email});
    if(!user){
        throw new CustomError.UnauthenticatedError('Invalid credentials. No user found ');
    }

    //this is a method we created om user MODEL
    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect){
        throw new CustomError.UnauthenticatedError('Invalid credentials. Password is not correct');
    }

    //WE ARE SENDING THE USER INFO WE FOUND AND ATTACH IT TO THE COOKIE
    const tokenUser = createTokenUser(user);
                       
    attachCookiesToResponse({res,user:tokenUser});
}


const logout = async (req,res) =>{

    //REMOVE THE COOKIE FROM WHATEVER USER IS ALREADY IN 
    res.cookie('token','logout',{
        httpOnly:true,
        expires: new Date(Date.now())
    });
    res.status(StatusCodes.OK).json({msg:'user logged out'})
}


module.exports = {
    register,
    login,
    logout
}