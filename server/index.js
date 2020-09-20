require('dotenv').config(); //to use .env
const express = require("express");
const app = express();
const path = require('path');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const sessionStore = new session.MemoryStore(); //Store in memory, not a good idea for memory leak
const flash = require('connect-flash');
//......................................................................
const productsRouter = require('./routes/productsRouter');
const authRouter = require('./routes/authRouter');
const userDataRouter = require('./routes/getUserData');
const setAuthStrategies = require('./auth/auth');

//Connect to the DB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

//----------------------------------------------------------------------
//Serve index.html and public files to index.html
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(express.static(path.resolve(__dirname, './public')));

app.get('/', (req, res) => {
  console.log(req.isAuthenticated())
  console.log("hello")
  res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
});
app.get('/test', (req, res) => {
  console.log(req.isAuthenticated())
  console.log("hello")
  res.redirect('/');
});
//----------------------------------------------------------------------
// Set the bodyparsers for urlencoded and json and cookieParser for passport cookies
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//----------------------------------------------------------------------
//Set the Express-Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    key: "express.sid",
    store: sessionStore
  })
);
app.use(flash()); //Support for flash messagesi in req
//----------------------------------------------------------------------
//Auth Strategies
setAuthStrategies(app);
//----------------------------------------------------------------------
//API Endpoints
app.use('/products', productsRouter);
app.use('/auth', authRouter);
app.use('/user', userDataRouter);



const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
