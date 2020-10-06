const path = require('path');
const fs = require('fs'); //needed to delete the file uploaded once done
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);
const Product = require('../models/Product');
const lookForImagePath = require('../helpers/lookForImagePath');

async function addProduct(req, res) {
  // Here I create the DB instance of the item added using the req queries
  console.log('isAuth:' + req.isAuthenticated());
  console.log('bodys:', { ...req.body });
  try {
    let product = new Product(
      {
        ...req.body,
        owner: req.user.email,
        sellerName: `${req.user.name} ${req.user.surname}`,
        soldNTimes: 0,
        numberOfVotes: 0,
        rating: 0
      });
    let productDB = await product.save();
    res.status(200).send({ msg: 'Congrats! Your Product has been added to the store!' })
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: 'There was an error during the registration of the product' });
    throw (err);
  }
}

async function getProducts(req, res) {
  console.log('Client is fetching products');
  try {
    const pathToProductPic = path.resolve(__dirname, '..', 'assets', 'product-pics');
    let products = await Product.find();
    /*products = await Promise.all(products.map(async obj => {
      const picture = await readFileAsync(pathToProductPic + '/' + obj.productPicName, 'base64');
      return {
        _id: obj._id,
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
    }));*/
    const finalProducts = [];
    for (let obj of products){
      const picture = await readFileAsync(pathToProductPic + '/' + obj.productPicName, 'base64');
    finalProducts.push( 
      {
     _id: obj._id,
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
    )
    }
    res.status(200).send(finalProducts);
  } catch (error) {
    console.log(error);
    throw (error);
  }
}

async function rateProduct(req, res) {
  let product;
  const _id = req.body._id;
  const score = req.body.score;
  console.log('Rating the product');
  try {
    product = await Product.findOne({ _id });
    if (product.owner === req.user.email) return res.status(400).send({ msg: "You can't rate your product!" })
    if (product.ratedBy.includes(req.user.email)) return res.status(400).send({ msg: "You already  rated this product" });
    let numberOfVotes = product.numberOfVotes + 1;
    let rating = ((product.rating * product.numberOfVotes) + score) / numberOfVotes;
    updatedProduct = await Product.updateOne({ _id }, {
      numberOfVotes,
      rating,
      $push: {
        ratedBy: req.user.email
      }
    });
    res.status(200).send({ msg: "Your vote has been processed" })
  } catch (error) {
    console.log(error);
    throw (error);
  }
}

async function pay(req, res) {
  try {
    let cart = req.body.cart.map(x => ({ _id: x._id, price: x.price, quantity: x.quantityInCart, productName: x.productName }));
    console.log(cart)
    let payments = [];
    //Here I have to integrate Paypal SDK marketplace payments
    if (false) res.status(400).send({ msg: "impossible to process the payment" });
    //In case payment succeeded update the "bought by" category of product:
    for (let productBought of cart)
      Product.updateOne({ _id: productBought._id }, {
        $push: {
          boughtBy: req.user.email
        }
      })
    res.status(200).send({ msg: "Payment Received" });
  } catch (err) {
    throw (err);
  }
}


async function uploadProductPicture(req, res) {
  try {
    console.log('Uploading product picture');
    console.log('params:', req.params);
    res.status(200).send({ msg: "Product picture successfully updated" });
  } catch (err) {
    throw (err);
  }
}

module.exports = {
  addProduct,
  getProducts,
  rateProduct,
  pay,
  uploadProductPicture
}