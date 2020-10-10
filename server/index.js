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
const flash = require('connect-flash');
const MongoStore = require('connect-mongo')(session); 
//......................................................................
const productsRouter = require('./routes/productsRouter');
const authRouter = require('./routes/authRouter');
const userDataRouter = require('./routes/userDataRouter');
const publicDataRouter = require('./routes/publicDataRouter');
const setAuthStrategies = require('./auth/auth');
//Template engine
app.set("view engine", "pug");
//Connect to the DB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
const sessionStore = new MongoStore({mongooseConnection: mongoose.connection});
//----------------------------------------------------------------------
//Serve index.html and public files to index.html
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(express.static(path.resolve(__dirname, './public')));
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
app.use(flash()); //Support for flash messages in req
//----------------------------------------------------------------------
//Auth Strategies
setAuthStrategies(app);
//----------------------------------------------------------------------
//API Endpoints

app.get('/test', (err, req, res,next) => {
  console.log('test:',err,req,res,next)
  console.log(req.isAuthenticated())
  console.log(req.session)
  res.redirect('/');
});

app.use('/products', productsRouter);
app.use('/auth', authRouter);
app.use('/user', userDataRouter);
app.use('/public', publicDataRouter);


app.get('/test',function(req,res){
  console.log('is auth?:', req.isAuthenticated(), 'user',req.user)
})
//manages non existant url so react router can handle it
app.get('/*', (req, res) => {
  switch(process.env.ENVIRONMENT){
    case "dev": res.redirect("http://localhost:3000");
    break;
    case "prod": res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
    break;
  }
  
  
 
});

//Custom error handler
app.use((error, req, res, next) => {
  console.log('Custom Error Handler');
  res.status(error.status || 500);
  res.send({msg:`Error ${error.status || 500} ${error.message} ${error.stack}`});
  console.log(error);
})

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
