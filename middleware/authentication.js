const CustomError = require('../errors')
const { isTokenValid } = require('../utils');


//THIS METHOD CHECK IF THERE IS A TOKEN AND GETS THE NAME,USERID,AND ROLE FROM THE COOKIE TOKEN WE ARE CHECKING
//BASICALLY GETS THE INFORMATION FROM THE EXISTING LOG IN TOKEN 
const authenticateUser = async(req,res,next)=>{

   const token = req.signedCookies.token;
  
   
   if(!token){
     throw new CustomError.UnauthenticatedError('token not found')
   }

   try{

    const {name,userId,role} = isTokenValid({ token });

    req.user = {name,userId,role};
     
     next();

   }catch(error){
    throw new CustomError.UnauthenticatedError('Authentication invalid');
   }
}

//ONCE WE GET THE TOKEN INFO WITH THE USER INFO WE MAKE SURE THE USER IS ADMIN, IF NOT THEN, WILL AN ERROR
const authorizePermissions = (...roles)=>{
  // if(req.user.role !== 'admin'){
  //   //WE CREATED this CUSTOM ERROR
  //   throw new CustomError.unauthorizedError('Unauthorized to access to this route');
  // }
  // next();

  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        'Unauthorized to access this route'
      );
    }
    next();
  };
}


module.exports={
    authenticateUser,
    authorizePermissions
}