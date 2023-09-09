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
  //HASH THE PASSWORD
UserSchema.pre('save',async function(){
  //THIS MAKE SURE THAT USER GONNA BE HASH IF THE PASSWORD IS NOT MODIFIED
  if(!this.isModified('password')) return;
  //
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})

//COMPARE PASSWORD
UserSchema.methods.comparePassword = async function(candidatePassword){
  const isMatch = await bcrypt.compare(candidatePassword,this.password);
  return isMatch;
}

module.exports = mongoose.model('User', UserSchema);