const express = require("express");
const app = express();
const router = express.Router();
const isAuthenticated = require('../helpers/authMiddleware');
const ObjectId = require("mongodb").ObjectID;
const multer = require('multer'); //multer is a middleware that parses bodies of POST with multi-part/formdata
const editRouter = require('../handlers/editRouter');
const {
  addProduct,
  getProducts,
  rateProduct,
  pay,
  uploadProductPicture
} = require('../handlers/productsRouterHandlers');

//Multer configuration:
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '..', 'assets', 'product-pics'));
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

const routers = [{
  router,
  method: 'post',
  path: '/add-product',
  middleware: [isAuthenticated, uploadProductPic.single('product-picture')],
  handler: addProduct
}, {
  router,
  method: 'get',
  path: '/get-products',
  middleware: [],
  handler: getProducts
},{
  router,
  method: 'post',
  path: '/rate-product',
  middleware: [isAuthenticated],
  handler: rateProduct
},{
  router,
  method: 'post',
  path: '/pay',
  middleware: [isAuthenticated],
  handler: pay
},{
  router,
  method: 'post',
  path: '/pay',
  middleware: [isAuthenticated],
  handler: pay
}, {
  router,
  method: 'post',
  path: '/upload-product-picture/:product_picture_name',
  middleware: [isAuthenticated, uploadProductPic.single('product-picture')],
  handler: uploadProductPicture
}]


for (let router of routers)
editRouter(router)







module.exports = router;