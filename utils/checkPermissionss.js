const CustomError = require('../errors');

//THIS CHECK USER ROLE
const checkPermissions = (requestUser, resourceUserId)=>{
//   console.log(request)
//   console.log(resourceId);
//   console.log(typeof resourceId)

//
 if(requestUser.role === 'admin')return;
 if(requestUser.userId === resourceUserId.toString)return;

 throw new CustomError.unauthorizedError('Not authorized user to access this route');

}

module.exports = checkPermissions