const CustomError = require('../errors')
const { isTokenValid } = require('../utils');

const authenticateUser = async(req,res,next)=>{

   const token = req.signedCookies.token;
  
   if(!token){
     new CustomError.UnauthenticatedError('token not found')
   }

   try{
    const {name,userId,role} = isTokenValid({ token });
    req.user = {name,userId,role};
    console.log(req.user);
     next();
   }catch(error){
    new CustomError.UnauthenticatedError('Authentication invalid')
   }

}

module.exports={
    authenticateUser
}