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

router.post('/rate-product', async (req, res) => {
  let product;
  const _id = req.body._id;
  const score = req.body.score;
  //console.log(req.body);
  try {
    product = await Product.findOne({ _id });
    
    let numberOfVotes = product.numberOfVotes+1;
    let rating = ((product.rating*product.numberOfVotes)+score) / numberOfVotes;
    console.log(numberOfVotes, product.rating, score)
    console.log(rating);
    updatedProduct = await Product.updateOne({ _id }, {
      numberOfVotes,
      rating
})
    res.sendStatus(200);
  } catch (error) {
    console.log(error)
  }
});
//Alternative serving of images with base64
/*router.get('/get-products', async (req, res) => {
  //Here I make the initial DB call for the items in db
  let products = [];
  try {
    products = await Product.find();
  } catch {
    console.log("Couldn't reach the DB")
  }
  try {
    //Add pics to the retrieved objects
    products = await Promise.all(products.map(async (obj) => {
      try {
        return await addPicToObject(obj);
      } catch {
        console.log("Error adding the picture data to the object")
      }
    }))
  } catch {
    console.log("Error, some promise did not resolve");
  }
  res.status(200).send(products);
});*/







//This is an alternative way to serve the image to client as base64 and not as a static asset
/*async function addPicToObject(obj) {

  let picName = obj.productName.toLowerCase().replace(/\s/g, '_');
  let fileNames = [];
  let picB64 = '';
  let type = obj.type;
  if (type === 'Vegetables') type = 'vegs';
  if (type === 'Fruit') type = 'fruit';
  switch (type) {
    case 'vegs': {
      try {
        vegsFileNames = await readDir(path.resolve(__dirname, '../public/vegs-pics'));
      } catch {
        console.log("Error, couldn't read the full directory");
      }
      vegsFileId = vegsFileNames.map(x => convertIdNames(x));
      if (vegsFileId.includes(picName)) {
        let filePath = path.resolve(__dirname, '../public/vegs-pics') + '/' + picName + '.png';
        try {
          picB64 = await readFile(filePath, 'base64');
        } catch {
          console.log("Error, couldn't read the image file");
        }
      } else console.log(picName, 'Not found');
    };
      break;
    case 'fruit': {
      try {
        fruitFileNames = await readDir(path.resolve(__dirname, '../public/fruit-pics'));
      } catch {
        console.log("Error, couldn't read the full directory");
      }
      fruitFileId = fruitFileNames.map(x => convertIdNames(x));
      if (fruitFileId.includes(picName)) {
        let filePath = path.resolve(__dirname, '../public/vegs-pics') + '/' + picName + '.png';
        try {
          picB64 = await readFile(filePath, 'base64');
        } catch {
          console.log("Error, couldn't read the image file");
        }
      } else console.log(picName, 'Not found')
    };
      break;
  }
  let result = { type: obj.type, productName: obj.productName, sellerName: obj.sellerName, price: obj.price, quantityAvailable: obj.quantityAvailable, soldNTimes: obj.soldNTimes, pic: picB64, description: obj.description };
  return result;
}
*/






module.exports = router;