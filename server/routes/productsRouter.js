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
  
  console.log(req.isAuthenticated())
  try {
    let product = new Product({ ...req.body, soldNTimes: 0 });
    let productDB = await product.save();
    res.status(200).send({isOk:true})
  } catch {
    console.log('Adding product to DB met an error');
    res.status(400).send({isOk:false, error:'There was an error during the registration of the product'});
  }

})

//Alternative to serve image as a static asset
router.get('/get-products', async (req, res) => {
  let products = [];
  try {
    products = await Product.find();
  } catch (error){
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
  }))
  res.status(200).send(products);
});


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


//-------------------------------------------------------------------------------------------------------
//------ Logic Functions  -----------------------------------------------------------------------------

 function lookForImagePath(obj) {
  let picName = obj.productName.toLowerCase().replace(/\s/g, '_');
  let fileNames = [];
  let type = obj.type;
  let imgPath = type === 'Vegetables' ?
    '/vegs-pics' + '/' + picName + '.png' :
    '/fruit-pics' + '/' + picName + '.png';
    
  return imgPath;
}



//This is an alternative way to serve the image to client as base64 and not as a static asset
async function addPicToObject(obj) {

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







module.exports = router;