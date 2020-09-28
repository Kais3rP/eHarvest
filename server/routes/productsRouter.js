const express = require("express");
const app = express();
const router = express.Router();
const convertIdNames = require('../helpers/convertIdNames.js');
const Product = require('../models/Product');
const isAuthenticated = require('../helpers/authMiddleware');
const lookForImagePath = require('../helpers/lookForImagePath');
const ObjectId = require("mongodb").ObjectID;
const multer = require('multer'); //multer is a middleware that parses bodies of POST with multi-part/formdata
const fs = require('fs'); //needed to delete the file uploaded once done
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);
const path = require('path');
//Multer configuration:
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname,'..','assets','product-pics'));
  },
  filename: (req, file, cb) => {
    console.log(file);
        cb(null, req.params.product_picture_name);
     
  }
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}
const uploadProductPic = multer({ storage: storage, fileFilter: fileFilter });


//------------------------------------------------------------------------------

router.post('/add-product', isAuthenticated,uploadProductPic.single('product-picture'), async (req, res, next) => {
  // Here I create the DB instance of the item added using the req queries
  console.log('isAuth:' + req.isAuthenticated());
  console.log('bodys:',{...req.body});

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
    console.log(err);
    res.status(400).send({ msg: 'There was an error during the registration of the product' });
  }

})

//Alternative to serve image as a static asset
router.get('/get-products', async (req, res) => {
  console.log('Client is fetching products');
  
  
    
  try {
    const pathToProductPic = path.resolve(__dirname,'..','assets','product-pics');
    let products = await Product.find();

    products = await Promise.all(products.map( async obj => {
    
    const picture = await readFileAsync(pathToProductPic+'/'+obj.productPicName, 'base64');
    
    return {
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
    productPicName: obj.productPicName,
    realPicture: picture
    
  }
}));

  res.status(200).send(products);
} catch (error) {
  console.log(error)
}
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

//In case payment succeeded update the "bought by" category of product:
for (let productBought of cart)
   Product.updateOne({_id: productBought._id}, {$push:{
    boughtBy: req.user.email
  }})
res.status(200).send({msg:"Payment Received"})

});

router.post('/upload-product-picture/:product_picture_name', isAuthenticated, uploadProductPic.single('product-picture'), async (req, res) => {
  console.log('Uploading product picture');
  console.log('params:',req.params);
res.status(200).send({msg: "Product picture successfully updated"});
  
})



module.exports = router;