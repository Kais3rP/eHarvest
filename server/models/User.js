const mongoose = require('mongoose');

//-------------MongoDB Model---------------
  var userSchema = new mongoose.Schema({name:String, email:String, password:String});
  var User = mongoose.model('Users', userSchema)
 //----------------------------------------------------- 
  
  module.exports = User;