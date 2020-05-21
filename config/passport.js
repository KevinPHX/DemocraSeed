const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const Administrator = require('../models/administrator');
const Mentor = require('../models/mentor')
const config = require('../config/database');
module.exports = function(passport){
  let opts = {};//creating and adding to options
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();//Gets token from here
  opts.secretOrKey = config.secret;//key in config (secret)
  passport.use("user-rule", new JwtStrategy(opts, (jwt_payload, done) =>{
    console.log(jwt_payload);//payload get user info
    User.getUserById(jwt_payload._doc._id, (err,user) => {
      if (err){
        return done(err, false);
      }
      if (user){
        return done(null, user);
      } else{
        return done(null, false);
      }
    });
  }));
  passport.use("admin-rule", new JwtStrategy(opts, (jwt_payload, done) =>{
    console.log(jwt_payload);//payload get user info
    Administrator.getAdministratorById(jwt_payload._doc._id, (err,user) => {
      if (err){
        return done(err, false);
      }
      if (user){
        return done(null, user);
      } else{
        return done(null, false);
      }
    });
  }));
  passport.use("mentor-rule", new JwtStrategy(opts, (jwt_payload, done) =>{
    console.log(jwt_payload);//payload get user info
    Mentor.getMentorById(jwt_payload._doc._id, (err,user) => {
      if (err){
        return done(err, false);
      }
      if (user){
        return done(null, user);
      } else{
        return done(null, false);
      }
    });
  }));
}


//Creating strategies
