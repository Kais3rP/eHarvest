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

//......................................................................
const productsRouter = require('./routes/productsRouter');
const authRouter = require('./routes/authRouter');
const setAuthStrategies = require('./auth/auth');

//Connect to the DB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

//----------------------------------------------------------------------
//Serve index.html and public files to index.html
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
});
//----------------------------------------------------------------------
// Set the bodyparsers for urlencoded and json and for passport cookies
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
//----------------------------------------------------------------------
//Auth Strategies
setAuthStrategies(app);
//----------------------------------------------------------------------
//API Endpoints
app.use('/products', productsRouter);
app.use('/auth', authRouter);



const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
