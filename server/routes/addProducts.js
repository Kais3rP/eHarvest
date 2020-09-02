const express = require("express");
const app = express();
const router = express.Router();
const Product = require('../models/Product');


router.post('/add-product', async (req,res,next) =>{
// Here I create the DB instance of the item added using the req queries
  //let item = new Item({})
  try {
    console.log(req.body.productName);
  let product = new Product({...req.body, soldNTimes:2});
  console.log(product);
  let productDB = await product.save();
  console.log(productDB);
  res.status(200).redirect('/sell');
  } catch {
  console.log('Adding product to DB met an error');
  res.status(400).redirect('/error-page');
  }

})

module.exports = router;