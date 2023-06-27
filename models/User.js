const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');


const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    minlength: 3,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true,
    validate:{
      validator: validator.isEmail,
      message: 'Please provide valid email'
    }
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
  },
  role:{
    type:String,
    enum:['user','admin'],
    default:'user'
  }
});
  

module.exports = mongoose.model('User', UserSchema);