const path = require('path');
const fs = require('fs'); //needed to delete the file uploaded once done
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);
const readDirAsync = util.promisify(fs.readdir);
const Product = require('../models/Product');
const User = require("../models/User");
const lookForImagePath = require('../helpers/lookForImagePath');


async function getPublicUserData(req, res) {
    try {
        console.log('Getting Public user data')
        const _id = req.params._id;
        const obj = await Product.findOne({_id});
        let user = await User.findOne({email:obj.owner});
        //Retrieve the user picture
        const pathToUserPic = path.resolve(__dirname, '..', 'assets', 'user-pics');
        const nameOfUserPic = user._id.toString();
        //Checks if there is a userpic saved on server
        const results = await readDirAsync(pathToUserPic);
        if (results.includes(nameOfUserPic)){
        const buffer = await readFileAsync(pathToUserPic + '/' + nameOfUserPic);
        picture = buffer.toString('base64');
        }
        let productsInSale = await Product.find({owner:user.email});
        productsInSale = productsInSale.map(prod => prod._id)  //Retrieve the list of all the ids of the products they are already present on  client
        console.log(productsInSale)
        user = {
            name: user.name,
            surname: user.surname,
            description: user.description,
            productsInSale,
            picture,
        };
        res.status(200).send(user);
    } catch (err) {
        console.log(err);
        throw (err);
    }
}

module.exports = {
    getPublicUserData
}
