const mongoose = require('mongoose');

//-------------MongoDB Model---------------
var userSchema = new mongoose.Schema({
  name: String,
  surname: String,
  email: String,
  password: String,
  roles: String,
  isVerified: { type: Boolean, default: false },
  passwordResetToken: String,
  passwordResetExpires: Date
});
var User = mongoose.model('Users', userSchema)
//----------------------------------------------------- 

module.exports = User;