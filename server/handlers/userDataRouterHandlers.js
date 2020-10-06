const path = require('path');
const fs = require('fs'); //needed to delete the file uploaded once done
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);
const Product = require('../models/Product');
const User = require("../models/User");
const lookForImagePath = require('../helpers/lookForImagePath');


async function getUserProducts(req, res) {
    try {
        console.log('Client is fetching personal user products');
        let products = await Product.find({ owner: req.user.email });
        console.log(req.user.email)
        products = products.map(obj => ({
            _id: obj._id,
            type: obj.type,
            productName: obj.productName,
            sellerName: obj.sellerName,
            price: obj.price,
            quantityAvailable: obj.quantityAvailable,
            soldNTimes: obj.soldNTimes,
            pic: lookForImagePath(obj),
            description: obj.description,
            numberOfVotes: obj.numberOfVotes,
            rating: obj.rating,
        }));
        //console.log(products)
        res.status(200).send(products);
    } catch (err) {
        console.log(err);
        throw (err);
    }
};

async function getPersonalData(req, res) {
    try {
        console.log('Fetching personal user data')
        const pathToUserPic = path.resolve(__dirname, '..', 'assets', 'user-pics');
        let user = await User.findOne({ email: req.user.email });
        const nameOfUserPic = user._id.toString();
        const buffer = await readFileAsync(pathToUserPic + '/' + nameOfUserPic)
        picture = buffer.toString('base64')
        user = {
            name: user.name,
            surname: user.surname,
            email: user.email,
            description: user.description,
            picture
        };
        console.log(user.name)
        res.status(200).send(user);
    } catch (err) {
        console.log(err);
        throw (err);
    }
};

async function updatePersonalData(req, res) {
    try {
        console.log('Updating personal user data')
        //***Need to validate non empty strings in req.body or it will return undefined in db  
        if (req.body.email !== req.user.email)
            await Product.updateMany({ ratedBy: req.user.email },
                {
                    $push: {
                        ratedBy: req.body.email
                    }
                })
        await Product.updateMany({ owner: req.user.email },
            {
                owner: req.body.email,
                sellerName: `${req.body.name} ${req.body.surname}`,
            });
        let user = await User.findOne({ email: req.user.email });
        Object.assign(user, { ...req.body });
        await user.save();
        console.log('Update Successful')
        res.status(200).send({ msg: 'Update Successful' });
    } catch (err) {
        console.log(err);
        throw (err);
    }
};

async function getProductsBoughtByUser(req, res) {
    try {
        let products = Product.find({ boughtBy: [req.user.email] });
        products = products.map(obj => ({
            _id: obj._id,
            type: obj.type,
            productName: obj.productName,
            sellerName: obj.sellerName,
            price: obj.price,
            quantityAvailable: obj.quantityAvailable,
            soldNTimes: obj.soldNTimes,
            pic: lookForImagePath(obj),
            description: obj.description,
            numberOfVotes: obj.numberOfVotes,
            rating: obj.rating
        }));
        res.status(200).send(products);
    } catch (err) {
        console.log(err);
        throw (err);
    }
};

async function uploadPersonalPicture(req, res) {
    try {
        console.log('Uploading personal picture')
        res.status(200).send({ msg: "Profile picture successfully updated" });
    } catch (err) {
        console.log(err);
        throw (err);
    }
}

module.exports = {
    getUserProducts,
    getPersonalData,
    updatePersonalData,
    getProductsBoughtByUser,
    uploadPersonalPicture
}