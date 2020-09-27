const express = require("express");
const router = express.Router();
const isAuthenticated = require('../helpers/authMiddleware');
const Product = require('../models/Product');
const lookForImagePath = require('../helpers/lookForImagePath');
const User = require("../models/User");
const multer = require('multer'); //multer is a middleware that parses bodies of POST with multi-part/formdata
const fs = require('fs'); //needed to delete the file uploaded once done
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);
const path = require('path');
const isBlob = require('is-blob');
//Multer configuration:
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname,'..','assets','user-pics'));
  },
  filename: (req, file, cb) => {
    console.log(file);

    //let _id ='';
    User.findOne({ email: req.user.email }).exec()
      .then(user => {
        let _id = user._id.toString();
        cb(null, _id);
      })
      .catch(err => console.log(err))
  }
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}
const uploadUserPic = multer({ storage: storage, fileFilter: fileFilter });
//const uploadUserPic = multer({dest:'assets/user-pics'});

//------------------------------------------------------------------------------

router.get('/get-user-products', isAuthenticated, async (req, res) => {
  let products = [];
  try {
    products = await Product.find({ owner: req.user.email });
  } catch (err) {
    console.log(err)
  }

  products = products.map(obj => ({
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
  }));
  res.status(200).send(products);
});

router.get('/get-personal-data', isAuthenticated, async (req, res) => {
  console.log('Fetching personal user data')
  const pathToUserPic = path.resolve(__dirname,'..','assets','user-pics');
  console.log(pathToUserPic)
  try {
  let user = await User.findOne({ email: req.user.email });
    console.log(user._id)
  const nameOfUserPic = user._id.toString(); 
    const buffer = await readFileAsync(pathToUserPic+'/'+nameOfUserPic)
    picture = buffer.toString('base64')

    user = {
      name: user.name,
      surname: user.surname,
      email: user.email,
      description: user.description,
      picture
    };

    
    res.status(200).send(user);
  } catch (err) {
    console.log(err)
  }
 
});

router.post('/update-personal-data', isAuthenticated, async (req, res) => {
  console.log('Updating personal user data')

  let previousUserData = { owner: req.user.email, sellerName: `${req.user.name} ${req.user.surname}` };
  let user;
  try {
    if (req.body.email !== req.user.email)
      await Product.updateMany({ ratedBy: req.user.email },
        {
          $push: {
            ratedBy: req.body.email
          }
        })
    user = await User.findOne({ email: req.user.email });

    Object.assign(user, { ...req.body });

    await user.save();
    //console.log(user)
    let products = await Product.updateMany({ owner: previousUserData.owner },
      {
        owner: req.body.email,
        sellerName: `${req.body.name} ${req.body.surname}`,
      });

  } catch (err) {
    console.log(err)
  }



  console.log('Update SUccessful')
  res.status(200).send({ msg: 'Update Successful' });
});

router.get('/get-user-bought', isAuthenticated, async (req, res) => {

  let products = [];
  try {
    products = Product.find({ boughtBy: [req.user.email] });

  } catch (err) {
    console.log(err);
  }
  products = products.map(obj => ({
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
    rating: obj.rating
  }));
  res.status(200).send(products);
});

router.post('/upload-personal-picture', isAuthenticated, uploadUserPic.single('user-picture'), async (req, res) => {
  console.log('Uploading personal picture')
res.status(200).send({msg: "Profile picture successfully updated"});
  
})

module.exports = router;