const CustomError = require('../errors');

//THIS CHECK USER ROLE
const checkPermissions = (requestUser, resourceUserId)=>{
  console.log(requestUser)
  console.log(resourceUserId);
  console.log(typeof resourceUserId)

//
 if(requestUser.role === 'admin')return;
 if(requestUser.userId === resourceUserId.toString)return;

 throw new CustomError.unauthorizedError('Not authorized user to access this route');

}

module.exports = checkPermissions