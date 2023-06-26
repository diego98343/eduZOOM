const mongoose = require('mongoose');
const validator = require('validator')
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please provide name'],
        minlength:3,
        maxlength:50
    },
    email:{
        type:String,
        require:[true,'Please provide email'],
        validate:{
            //this a built in feature so we do not have put the email validation long code
            validator: validator.isEmail,
            message:'Please provide valid email'
        } 
    },
    passWord:{
        type:String,
        required:[true,'Please provide passWord'],
        minlength:6
        
    },
    role:{
        type:String,
        enum:['admin','user'],
        default: 'user'
    }
})



module.exports = mongoose.model('User', UserSchema);