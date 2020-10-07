const express = require("express");
const router = express.Router();
const path = require('path');
const isAuthenticated = require('../helpers/authMiddleware');
const User = require("../models/User");
const multer = require('multer'); //multer is a middleware that parses bodies of POST with multi-part/formdata
const editRouter = require('../handlers/editRouter');
const {
  getUserProducts,
  getPersonalData,
  updatePersonalData,
  getProductsBoughtByUser,
  uploadPersonalPicture
} = require('../handlers/userDataRouterHandlers');

//Multer configuration:
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname,'..','assets','user-pics'));
  },
  filename: (req, file, cb) => {
    console.log(file);

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

//------------------------------------------------------------------------------
const routers = [{
  router,
  method: 'get',
  path: '/get-user-products',
  middleware: [ isAuthenticated ],
  handler: getUserProducts
},{
  router,
  method: 'get',
  path: '/get-personal-data',
  middleware: [isAuthenticated],
  handler: getPersonalData
},{
  router,
  method: 'post',
  path: '/update-personal-data',
  middleware: [isAuthenticated],
  handler: updatePersonalData
},{
  router,
  method: 'get',
  path: '/get-user-bought',
  middleware: [isAuthenticated],
  handler: getProductsBoughtByUser
}, {
  router,
  method: 'post',
  path: '/upload-personal-picture',
  middleware: [isAuthenticated, uploadUserPic.single('user-picture')],
  handler: uploadPersonalPicture
}]


for (let router of routers)
editRouter(router)

module.exports = router;