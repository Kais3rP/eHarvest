const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const ObjectId = require("mongodb").ObjectID;
const User = require("../models/User");


module.exports = function(app) {
    
    app.use(passport.initialize());
    app.use(passport.session());
  
    passport.serializeUser((user, done) => {
        console.log("serialize")
      if (user.id) done(null, user.id);
      else done(null, user._id); //This needs to identify the id in deserializeuser that comes from a user registered locally and not with OAuth2
    });
  
    passport.deserializeUser((id, done) => {
        console.log("deserialize")
      if (/[a-z]/.test(id)) User.findOne(
          { _id: new ObjectId(id) },
          (err, doc) => {
            done(null, doc);
          }
        );
      else
      User.findOne({ id: id }, (err, doc) => {
          done(null, doc);
        });
    });
  
    //Local Strategy
    passport.use(
      new LocalStrategy(
        {
        usernameField: 'email',
        passwordField: 'password'
        },
        async function(username, password, done) {
        let user = {};
        try {
            console.log("User " + username + " attempted to log in.");
           user = await User.findOne({ email: username });
          } catch {
              console.log('DB fetching for email failed')
          }
  
          if (!user) {
            console.log("User non registered");
            return done(null, false);
          }
          let passwordIsValid = bcrypt.compareSync(password, user.password);
          if (!passwordIsValid) {
            console.log("Wrong Password");
            return done(null, false);
          } //password wrong { return done(null, false); }
  
          return done(null, user);
        }));
    }