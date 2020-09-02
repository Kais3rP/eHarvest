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


router.get('/products', async (req, res) => {
//Here I make the initial DB call for the items in db
try {
let products = await Product.find();
//Add pics to the retrieved objects
const productsFinal = await Promise.all(products.map(async function (obj) { 
    
  let modifiedObj = await addPicToObject(obj);
  return modifiedObj;
}))
res.status(200).send(productsFinal);
} catch {
    console.log("Error fetching the DB for products list");
}
//Then perform the logic to create the most sold and offers items arrays
//Then as last thing I loop inside these arrays objects, compare their names property with pic list
//pick the right image and convert it to b64 and add it to the relative object then when it's all done
//The object with the 3 arrays is sent to the client
   //serveObjectFromPic('../models/offers-pics', res)
});


//-------------------------------------------------------------------------------------------------------
//------ Logic Functions  -----------------------------------------------------------------------------


async function addPicToObject(obj) {
   
    let picName = obj.productName.toLowerCase().replace(/\s/g,'_');
    let fileNames = [];
    let picB64 = '';
    let type = '';
    vegsFileNames = await readDir(path.resolve(__dirname, '../models/vegs-pics'));
    fruitFileNames = await readDir(path.resolve(__dirname, '../models/fruit-pics'));
    console.log(picName, obj.productName)
    vegsFileId = vegsFileNames.map( x => convertIdNames(x) );
    fruitFileId = fruitFileNames.map( x => convertIdNames(x) );
    if (vegsFileId.includes(picName)) {
        type='vegetables';
    let filePath = path.resolve(__dirname, '../models/vegs-pics') + '/' + picName + '.png';
     picB64 = await readFile(filePath, 'base64');
    } else  if (fruitFileId.includes(picName)){
        type='fruit';
        let filePath = path.resolve(__dirname, '../models/fruit-pics') + '/' + picName + '.png';
         picB64 = await readFile(filePath, 'base64');
    } else console.log(picName, 'Not found')
   let result = {type: type, productName:obj.productName, sellerName:obj.sellerName, price:obj.price, quantityAvailable: obj.quantityAvailable, soldNTimes:obj.soldNTimes, pic:picB64, description:obj.description};
    return result;
}


module.exports = router;