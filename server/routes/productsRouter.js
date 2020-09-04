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


router.post('/add-product', async (req, res, next) => {
  // Here I create the DB instance of the item added using the req queries
  //let item = new Item({})
  try {
    let product = new Product({ ...req.body, soldNTimes: 2 });
    let productDB = await product.save();
    res.status(200).redirect('/');
  } catch {
    console.log('Adding product to DB met an error');
    res.status(400).redirect('/error-page');
  }

})

router.get('/get-products', async (req, res) => {
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
});


//-------------------------------------------------------------------------------------------------------
//------ Logic Functions  -----------------------------------------------------------------------------


async function addPicToObject(obj) {

  let picName = obj.productName.toLowerCase().replace(/\s/g, '_');
  let fileNames = [];
  let picB64 = '';
  let type = '';
  try {
    vegsFileNames = await readDir(path.resolve(__dirname, '../models/vegs-pics'));
    fruitFileNames = await readDir(path.resolve(__dirname, '../models/fruit-pics'));
  } catch {
    console.log("Error, couldn't read the full directory");
  }
  vegsFileId = vegsFileNames.map(x => convertIdNames(x));
  fruitFileId = fruitFileNames.map(x => convertIdNames(x));
  if (vegsFileId.includes(picName)) {
    type = 'vegetables';
    let filePath = path.resolve(__dirname, '../models/vegs-pics') + '/' + picName + '.png';
    try {
      picB64 = await readFile(filePath, 'base64');
    } catch {
      console.log("Error, couldn't read the image file");
    }
  } else if (fruitFileId.includes(picName)) {
    type = 'fruit';
    let filePath = path.resolve(__dirname, '../models/fruit-pics') + '/' + picName + '.png';
    try {
      picB64 = await readFile(filePath, 'base64');
    } catch {
      console.log("Error, couldn't read the image file");
    }
  } else console.log(picName, 'Not found')
  let result = { type: type, productName: obj.productName, sellerName: obj.sellerName, price: obj.price, quantityAvailable: obj.quantityAvailable, soldNTimes: obj.soldNTimes, pic: picB64, description: obj.description };
  return result;
}


module.exports = router;