require('dotenv').config(); //to use .env
const express = require("express");
const app = express();
const path = require('path');

const fs = require('fs');
const util = require('util');
const { resolve } = require('path');
const readFile = util.promisify(fs.readFile);
const readDir = util.promisify(fs.readdir);

const convertIdNames = require('./helpers/convertIdNames.js');
const prices = require('./models/prices.js');

app.use(express.static(path.resolve(__dirname, '../client/build')));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
  });

//Bundling multiple images to serve on client on load
  app.get('/offers', async (req,res) => {

    let fileNames = [];
    fileNames = await readDir(path.resolve(__dirname,"models/offers-pics"));
    let data = {};
    const files = await Promise.all(fileNames.map(async fileName => {
        let filePath = path.resolve(__dirname,"models/offers-pics") + '/' + fileName
        let file = await readFile(filePath,"base64");
        return file;
        
        }));
    //merge id and data
    let result =[];
    for ( let i = 0; i<fileNames.length; i++){
   result.push({id:convertIdNames(fileNames[i]),pic:files[i],price:prices[convertIdNames(fileNames[i])], quantityInCart:1})
    }
    console.log()
    res.status(200).json(result);
})
  const listener = app.listen(process.env.PORT, () => {
    console.log("Your app is listening on port " + listener.address().port);
  });
  