const express = require("express");
const router = express.Router();
const isAuthenticated = require('../helpers/authMiddleware');
const Product = require('../models/Product');
const lookForImagePath = require('../helpers/lookForImagePath');

router.get('/get-user-products', isAuthenticated, async (req, res) => {
    let products = [];
    try {
      products = await Product.find({ owner: req.user.email });
    } catch (error) {
      console.log(error)
    }
  
    products = products.map(obj => ({
      type: obj.type,
      productName: obj.productName,
      sellerName: obj.sellerName,
      price: obj.price,
      quantityAvailable: obj.quantityAvailable,
      soldNTimes: obj.soldNTimes,
      pic: lookForImagePath(obj),
      description: obj.description
    }));
    res.status(200).send(products);
  });

  router.get('/get-user-data', isAuthenticated, async (req, res) => {
   
    res.status(200).send(req.user);
  });
module.exports = router;