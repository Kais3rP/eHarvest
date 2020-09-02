require('dotenv').config(); //to use .env
const express = require("express");
const app = express();
const path = require('path');
const getProducts = require('./routes/products');
const addProducts = require('./routes/addProducts');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Connect to the DB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
//----------------------------------------------------------------------
// Set the bodyparsers for urlencoded and json
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());
//----------------------------------------------------------------------
//Serve index.html and public files to index.html
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
});

//Initialize the items fetching routes as a middleware
app.use('/api', getProducts);
app.use('/api', addProducts);

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
