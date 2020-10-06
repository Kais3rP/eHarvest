const express = require("express");
const app = express();
const router = express.Router();
const User = require('../models/User');
const passport = require("passport");
const bcrypt = require("bcrypt");
const ObjectId = require("mongodb").ObjectID;
const Token = require('../models/TokenVerification');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const isAuthenticated = require('../helpers/authMiddleware');
const editRouter = require('../handlers/editRouter');
const {
    isLoggedin,
    register,
    login,
    loginError,
    logout,
    confirmationPost,
    resendTokenPost
} = require('../handlers/authRouterHandlers');


const routers = [{
    router,
    method: 'get',
    path: '/isloggedin',
    middleware: [isAuthenticated],
    handler: isLoggedin
  }, {
    router,
    method: 'post',
    path: '/register',
    middleware: [],
    handler: register
  },{
    router,
    method: 'get',
    path: '/login-error',
    middleware: [],
    handler: loginError
  },{
    router,
    method: 'post',
    path: '/login',
    middleware: [ passport.authenticate('local', {failureRedirect: '/auth/login-error', failureFlash: true, successFlash: true })],
    handler: login
  },{
    router,
    method: 'get',
    path: '/logout',
    middleware: [isAuthenticated],
    handler: logout
  }, {
    router,
    method: 'get',
    path: '/confirmation/:token',
    middleware: [],
    handler: confirmationPost
  },
  {
    router,
    method: 'get',
    path: '/resend',
    middleware: [],
    handler: resendTokenPost
  }]
  
  for (let router of routers)
  editRouter(router)
module.exports = router;