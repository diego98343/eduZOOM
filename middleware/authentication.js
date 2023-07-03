const CustomError = require('../errors')
const { isTokenValid } = require('../utils');

const authenticateUser = async(req,res,next)=>{

   const token = req.signedCookies.token;
  
   if(!token){
     console.log('token not found')
   }

   console.log(`token found ${token}`);
   next();
}

module.exports={
    authenticateUser
}