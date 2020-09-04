const mongoose = require('mongoose');

//-------------MongoDB Model---------------
  var productSchema = new mongoose.Schema({type: String, productName:String, sellerName:String, price:Number, quantityAvailable:Number, soldNTimes:Number, description:String});
  var Product = mongoose.model('Products', productSchema)
 //----------------------------------------------------- 
  
  module.exports = Product;