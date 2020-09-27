const express = require("express");
const router = express.Router();
const isAuthenticated = require('../helpers/authMiddleware');
const Product = require('../models/Product');
const lookForImagePath = require('../helpers/lookForImagePath');
const User = require("../models/User");

router.get('/get-user-products', isAuthenticated, async (req, res) => {
    let products = [];
    try {
      products = await Product.find({ owner: req.user.email });
    } catch (err) {
      console.log(err)
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
      rating: obj.rating,
    }));
    res.status(200).send(products);
  });

  router.get('/get-personal-data', isAuthenticated, async (req, res) => {
console.log('Fetching personal user data')
let user;
    try{
   user = await User.findOne({email:req.user.email});
  user = {
    name: user.name,
    surname: user.surname,
    email: user.email,
    description: user.description

  }
    } catch(err){
      console.log(err)
    }
    console.log(user)
   res.status(200).send(user);
  });

  router.post('/update-personal-data', isAuthenticated, async (req, res) => {
    console.log('Updating personal user data')

    let previousUserData = {owner:req.user.email,sellerName: `${req.user.name} ${req.user.surname}`};
    let user;
        try{
          if (req.body.email !== req.user.email) 
            await Product.updateMany({ratedBy: req.user.email},
               {$push:{
              ratedBy: req.body.email
            }})
       user = await User.findOne({email:req.user.email});
  
      Object.assign(user,{...req.body});
     
      await user.save();
      //console.log(user)
      let products = await Product.updateMany({owner:previousUserData.owner},
                                              {owner:req.body.email,
                                                 sellerName: `${req.body.name} ${req.body.surname}`,
                                                 });
  
        } catch(err){
          console.log(err)
        }
      

        
        console.log('Update SUccessful')
       res.status(200).send({msg:'Update Successful'});
      });

  router.get('/get-user-bought', isAuthenticated, async (req, res) => {

    let products = [];
    try {
  products = Product.find({boughtBy:[req.user.email]});

    } catch(err){
      console.log(err);
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
    }));
    res.status(200).send(products);
  });
module.exports = router;