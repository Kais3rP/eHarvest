const express = require("express");
const app = express();
const router = express.Router();
const User = require('../models/User');
const passport = require("passport");
const bcrypt = require("bcrypt");
const ObjectId = require("mongodb").ObjectID;


router.post('/register', async (req, res) => {
    
    const { name, surname, email, password } = req.body;
    let userEmail = {};
    try {
        userEmail = await User.findOne({ email }).exec();
    if (userEmail) return res.status(400).send({ error: "E-mail already registered", isOk: false });
  
    let hashedPwd = await bcrypt.hashSync(req.body.password, 8); //crpyting pwd
   
    let newUser = new User({ name, surname, email, password: hashedPwd });
        await newUser.save();
    
       
    } catch (error){
        console.log(error)
    }
    res.send({ isOk: true })
})

router.get('/login', (req,res) => {

   
    let message = req.flash().error[0];
    console.log(message)
    res.status(404).send({isOk:false, message: message})
    
})

router.post('/login', passport.authenticate('local', {failureRedirect: '/auth/login', failureFlash: true, successFlash: true }), (req, res) => {
    
   
    let message = req.flash().success[0];
    console.log(message)
res.status(200).send({isOk:true, user:req.body.email, message: message});
});

router.get('/logout', function(req, res){
    console.log("Logout attempt");
    req.logout();
    res.status(200).send({isOk:true, message:"Logout Successful"})
  });


module.exports = router;