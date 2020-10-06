const User = require('../models/User');
const passport = require("passport");
const bcrypt = require("bcrypt");
const ObjectId = require("mongodb").ObjectID;
const Token = require('../models/TokenVerification');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

async function isLoggedin(req, res) {
    try {
        res.status(200).send('User is logged');
    } catch (err) {
        console.log(err);
        throw (err);
    }
};


async function register(req, res) {
    try {
        const { name, surname, email, password } = req.body;
        let userEmail = await User.findOne({ email }).exec();
        if (userEmail) return res.status(400).send({ msg: 'The email address you have entered is already associated with another account.' })
        let hashedPwd = await bcrypt.hashSync(req.body.password, 8); //crpyting pwd       
        let user = new User({ name, surname, email, password: hashedPwd });
        await user.save();
        // Create a verification token for this user
        let token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
        // Save the verification token       
        await token.save();
        // Send the email
        //console.log(user)
        let transporter = nodemailer.createTransport({ service: 'Gmail', auth: { user: process.env.GMAIL_USERNAME, pass: process.env.GMAIL_PASSWORD } });
        let mailOptions = { from: 'eharvest00@gmail.com', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/auth/confirmation\/' + token.token + '.\n' };
        transporter.sendMail(mailOptions, function (err) {
            if (err) {
                console.log(err);
                return res.status(500).send({ msg: err.message });
            }
            res.status(200).send({ msg: 'A verification email has been sent to ' + user.email + '.' });
        });
    } catch (error) {
        console.log(error);
        throw (err);
    };
};

async function loginError(req, res) {
    try {
        let message = req.flash().error[0];
        console.log(message);
        res.status(404).send({ msg: message });
    } catch (err) {
        throw (err);
    }
}

async function login(req, res) {
    try {

        let user = await User.findOne({ email: req.body.email });

        let message = req.flash().success[0];
        console.log(message, 'isAuth:' + req.isAuthenticated())
        user = {
            name: user.name,
            surname: user.surname,
            email: user.email,
        }
        res.status(200).send({ user: user, msg: message });
    } catch (err) {
        console.log(err);
        throw (err);

    }
};

async function logout(req, res) {
    try {
        console.log("Logout attempt");
        req.logout();
        res.status(200).send({ msg: "Logout Successful" });
    } catch (err) {
        console.log(err);
        throw (err);

    }
};



async function confirmationPost(req, res) {
    try {
        console.log(req.params.token);
        // Find a matching token
        let token = Token.findOne({ token: req.params.token })
        if (!token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });
        // If we found a token, find a matching user
        let user = User.findOne({ _id: token._userId });
        if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
        if (user.isVerified) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });
        // Verify and save the user
        user.isVerified = true;
        await user.save();
        //Alternativley I can set a redirect to / after verification succeded
        res.status(200).send({ msg: "The account has been verified. Please log in." });
    } catch (err) {
        console.log(err);
        throw (err);
    }
};

async function resendTokenPost(req, res, next) {
    try {
        let user = User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send({ msg: 'We were unable to find a user with that email.' });
        if (user.isVerified) return res.status(400).send({ msg: 'This account has already been verified. Please log in.' });
        // Create a verification token, save it, and send email
        let token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
        // Save the token
        await token.save();
        // Send the email
        let transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { user: process.env.SENDGRID_USERNAME, pass: process.env.SENDGRID_PASSWORD } });
        let mailOptions = { from: 'no-reply@codemoto.io', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n' };
        await new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, function (err) {
                if (err) {
                    res.status(500).send({ msg: err.message });
                    reject();
                }
                res.status(200).send('A verification email has been sent to ' + user.email + '.');
                resolve();
            });
        });
    } catch (err) {
        console.log(err);
        throw (err);
    }
};




module.exports = {
    isLoggedin,
    register,
    login,
    loginError,
    logout,
    confirmationPost,
    resendTokenPost
}