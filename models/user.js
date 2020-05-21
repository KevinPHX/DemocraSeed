const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const axios = require('axios');
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/democraseed', ['users']);
var request = require("request");




//User Schema
const UserSchema = mongoose.Schema({
  role: {
    type: String,
    required: true
  },
  groupname: {
    type:String,
    required: true
  },
  mentorid: {
    type:String,
  },
  mentorname: {
    type:String,
  },
  cityname: {
    type:String,
    required: true
  },
  advisorfirstname: {
    type:String,
    required: true
  },
  advisorlastname: {
    type:String,
    required: true
  },
  advisoremail: {
    type:String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  memberlist: {
    type: Array,
    items: {
      type: Object,
      properties: {
        memberfirstname: {
          type:String
        },
        memberlastname: {
          type: String
        },
        memberemail: {
          type: String
        }
      }
    }
  },
  permission1: Boolean,
  permission2: Boolean,
  permission3: Boolean,
  permission4: Boolean,
  permission5: Boolean,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});









const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
  const query = {username: username}
  User.findOne(query, callback);
}
module.exports.getUserByEmail = function(email, callback){
  const query = {email: email}
  User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback){
  bcrypt.genSalt(10, (err, salt)=>{
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    })
  })
}

module.exports.updateUser = function(newUser, callback){
  newUser.save(callback);
}

module.exports.hashPassword = function(newUser, callback){
  bcrypt.genSalt(10, (err, salt)=>{
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      return callback;
      //newUser.save(callback);
    })
  })
}



module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}
