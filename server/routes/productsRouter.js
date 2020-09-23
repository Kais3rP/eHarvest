const express = require("express");
const app = express();
const router = express.Router();
const path = require('path');
const fs = require('fs');
const util = require('util');
const { resolve } = require('path');
const readFile = util.promisify(fs.readFile);
const readDir = util.promisify(fs.readdir);
const convertIdNames = require('../helpers/convertIdNames.js');
const Product = require('../models/Product');
const isAuthenticated = require('../helpers/authMiddleware');
const lookForImagePath = require('../helpers/lookForImagePath');
const ObjectId = require("mongodb").ObjectID;


router.post('/add-product', isAuthenticated, async (req, res, next) => {
  // Here I create the DB instance of the item added using the req queries
  console.log(req.user)
  console.log('isAuth:' + req.isAuthenticated())
  try {
    let product = new Product(
      {
        ...req.body,
        owner: req.user.email,
        sellerName: `${req.user.name} ${req.user.surname}`,
        soldNTimes: 0,
        numberOfVotes: 0,
        rating:0
      });
    let productDB = await product.save();
    res.status(200).send({ msg: 'Congrats! Your Product has been added to the store!' })
  } catch (err) {
    console.log('Adding product to DB met an error');
    res.status(400).send({ msg: 'There was an error during the registration of the product' });
  }

})

//Alternative to serve image as a static asset
router.get('/get-products', async (req, res) => {
  console.log('Client is fetching products');
  let products = [];
  try {
    products = await Product.find();
  } catch (error) {
    console.log(error)
  }

  products = products.map(obj => ({
    _id:obj._id,
    type: obj.type,
    productName: obj.productName,
    sellerName: obj.sellerName,
    price: obj.price,
    quantityAvailable: obj.quantityAvailable,
    soldNTimes: obj.soldNTimes,
    pic: lookForImagePath(obj),
    description: obj.description,
    numberOfVotes: obj.numberOfVotes,
    rating: obj.rating
    
  }))

 
  res.status(200).send(products);
});

router.post('/rate-product', isAuthenticated, async (req, res) => {
  let product;
  const _id = req.body._id;
  const score = req.body.score;
  console.log('Rating the product');
  try {
    product = await Product.findOne({ _id });
    if (product.owner === req.user.email) return res.status(400).send({msg: "You can't rate your product!"})
    if (product.ratedBy.includes(req.user.email)) return res.status(400).send({msg: "You already  rated this product"});
    
    let numberOfVotes = product.numberOfVotes+1;
    let rating = ((product.rating*product.numberOfVotes)+score) / numberOfVotes;
    updatedProduct = await Product.updateOne({ _id }, {
      numberOfVotes,
      rating,
      $push:{
        ratedBy: req.user.email
      }
});
res.status(200).send({msg: "Your vote has been processed"})
  } catch (error) {
    console.log(error)
  }
});

router.post('/pay', isAuthenticated, async (req, res) => {

//console.log(req.body);
let cart = req.body.cart.map( x => ({_id: x._id, price: x.price, quantity: x.quantityInCart, productName:x.productName}));
console.log(cart)
let payments = [];
//Here I have to integrate Paypal SDK marketplace payments
if(false) res.status(400).send({msg:"impossible to process the payment"});
res.status(200).send({msg:"Payment Received"})

});




module.exports = router;