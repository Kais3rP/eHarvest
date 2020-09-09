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


router.post('/register', async (req, res) => {
    
    const { name, surname, email, password } = req.body;
    let userEmail = {};
    let user = {};
    try {
        userEmail = await User.findOne({ email }).exec();
    if (userEmail) return res.status(400).send({ msg: 'The email address you have entered is already associated with another account.' })
  
    let hashedPwd = await bcrypt.hashSync(req.body.password, 8); //crpyting pwd
   
    user = new User({ name, surname, email, password: hashedPwd });
    await user.save();
    
       
    } catch (error){
        console.log(error);
        return res.status(400).send({ msg: error })
    };
    // Create a verification token for this user
    let token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
 
    // Save the verification token
    try {
        await token.save(); 
    } catch (error){
        console.log(error);
        return res.status(500).send({ msg: error }); 
    }
    // Send the email
    //console.log(user)
    let transporter = nodemailer.createTransport({ service: 'Gmail', auth: { user: process.env.GMAIL_USERNAME, pass: process.env.GMAIL_PASSWORD } });
    let mailOptions = { from: 'eharvest00@gmail.com', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/auth/confirmation\/' + token.token + '.\n' };
    transporter.sendMail(mailOptions, function (err) {
        if (err) { 
            console.log(err);
            return res.status(500).send({ msg: err.message }); }
        res.status(200).send({msg:'A verification email has been sent to ' + user.email + '.'});
    });
            
});

router.get('/login-error', (req,res) => {

   
    let message = req.flash().error[0];
    console.log(message)
    res.status(404).send({isOk:false, msg: message})
    
})

router.post('/login', passport.authenticate('local', {failureRedirect: '/auth/login-error', failureFlash: true, successFlash: true }), (req, res) => {
    
   
    let message = req.flash().success[0];
    console.log(message)
res.status(200).send({user:req.body.email, msg: message});
});

router.get('/logout', function(req, res){
    console.log("Logout attempt");
    req.logout();
    res.status(200).send({msg:"Logout Successful"});
  });


  
  router.get('/confirmation/:token', confirmationPost);
  router.get('/resend', resendTokenPost);

function confirmationPost (req, res, next) {
   
 
   console.log(req.params.token);
 
    // Find a matching token
    Token.findOne({ token: req.params.token }, function (err, token) {
        if (!token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });
 console.log(token, new ObjectId(token._userId), req.body.email);
        // If we found a token, find a matching user
        User.findOne({ _id: token._userId }, function (err, user) {
            if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
            if (user.isVerified) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });
 
            // Verify and save the user
            user.isVerified = true;
            user.save(function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                res.status(200).send("The account has been verified. Please log in.");
            });
        });
    });
};

function resendTokenPost(req, res, next) {
   
 
   
 
    User.findOne({ email: req.body.email }, function (err, user) {
        if (!user) return res.status(400).send({ msg: 'We were unable to find a user with that email.' });
        if (user.isVerified) return res.status(400).send({ msg: 'This account has already been verified. Please log in.' });
 
        // Create a verification token, save it, and send email
        var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
 
        // Save the token
        token.save(function (err) {
            if (err) { return res.status(500).send({ msg: err.message }); }
 
            // Send the email
            var transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { user: process.env.SENDGRID_USERNAME, pass: process.env.SENDGRID_PASSWORD } });
            var mailOptions = { from: 'no-reply@codemoto.io', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n' };
            transporter.sendMail(mailOptions, function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                res.status(200).send('A verification email has been sent to ' + user.email + '.');
            });
        });
 
    });
};
module.exports = router;