const express = require("express");
const app = express();
const router = express.Router();
const User = require('../models/User');
const passport = require("passport");
const bcrypt = require("bcrypt");
const ObjectId = require("mongodb").ObjectID;


router.post('/register', async (req, res) => {
    console.log(req.body);
    const { name, surname, email, password } = req.body;
    let userEmail = {};
    try {
        userEmail = await User.findOne({ email }).exec();
    } catch {
        console.log('Error retrieving User from DB')
    }
    if (userEmail) return res.status(400).send({ error: "E-mail already registered", isRegisterOk: false });
    let hashedPwd = bcrypt.hashSync(req.body.password, 8); //crpyting pwd
    let newUser = new User({ name, surname, email, password: hashedPwd });
    try {
        await newUser.save();
    } catch {
        console.log('Error during DB saving attempt of new user')
    }
    res.send({ isRegisterOk: true })
})



router.post('/login', passport.authenticate('local', { failureRedirect: "/" }), (req, res) => {
    console.log(req.body);
res.status(200).send({ isLoginOk: true });
})


module.exports = router;