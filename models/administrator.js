const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const axios = require('axios');
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/democraseed', ['administrators']);
var request = require("request");




//User Schema
const AdministratorSchema = mongoose.Schema({
  role: {
    type: String,
    required: true
  },
  administratorfirstname: {
    type:String,
    required: true
  },
  administratorlastname: {
    type:String,
    required: true
  },
  administratoremail: {
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
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});









const Administrator = module.exports = mongoose.model('Administrator', AdministratorSchema);

module.exports.getAdministratorById = function(id, callback){
  Administrator.findById(id, callback);
}

module.exports.getAdministratorByUsername = function(username, callback){
  const query = {username: username}
  Administrator.findOne(query, callback);
}
module.exports.getAdministratorByEmail = function(email, callback){
  const query = {email: email}
  Administrator.findOne(query, callback);
}

module.exports.addAdministrator = function(newAdministrator, callback){
  bcrypt.genSalt(10, (err, salt)=>{
    bcrypt.hash(newAdministrator.password, salt, (err, hash) => {
      if(err) throw err;
      newAdministrator.password = hash;
      newAdministrator.save(callback);
    })
  })
}

module.exports.updateAdministrator = function(newAdministrator, callback){
  newAdministrator.save(callback);
}

module.exports.hashPassword = function(newAdministrator, callback){
  bcrypt.genSalt(10, (err, salt)=>{
    bcrypt.hash(newAdministrator.password, salt, (err, hash) => {
      if(err) throw err;
      newAdministrator.password = hash;
      return callback;
      //newAdministrator.save(callback);
    })
  })
}



module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}
