const express = require("express");
const router = express.Router();
const path = require('path');
const isAuthenticated = require('../helpers/authMiddleware');
const User = require("../models/User");
const multer = require('multer'); //multer is a middleware that parses bodies of POST with multi-part/formdata
const editRouter = require('../handlers/editRouter');
const {
  getPublicUserData,
} = require('../handlers/publicUserDataRouterHandler');


//------------------------------------------------------------------------------
const routers = [{
    router,
    method: 'get',
    path: '/get-user-data/:_id',
    middleware: [ isAuthenticated ],
    handler: getPublicUserData
  }]
  
  
  for (let router of routers)
  editRouter(router)
  
  module.exports = router;
