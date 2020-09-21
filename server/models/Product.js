const mongoose = require('mongoose');

//-------------MongoDB Model---------------
var productSchema = new mongoose.Schema(
  {
    owner: String,
    type: String,
    productName: String,
    sellerName: String,
    price: Number,
    quantityAvailable: Number,
    soldNTimes: Number,
    description: String,
    numberOfVotes: Number,
    rating: Number,
    ratedBy: [String]
  });
var Product = mongoose.model('Products', productSchema)
//----------------------------------------------------- 

module.exports = Product;