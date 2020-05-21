const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const axios = require('axios');
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/democraseed', ['mentors']);
var request = require("request");




//User Schema
const MentorSchema = mongoose.Schema({
  role: {
    type:String,
    required: true
  },
  mentorfirstname: {
    type:String,
    required: true
  },
  mentorlastname: {
    type:String,
    required: true
  },
  mentoremail: {
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
  // groups: {
  //   type: Array,
  //   items: {
  //     type: Object,
  //     properties: {
  //       groupid: {
  //         type: String
  //       }
  //     }
  //   }
  // },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});









const Mentor = module.exports = mongoose.model('Mentor', MentorSchema);

module.exports.getMentorById = function(id, callback){
  Mentor.findById(id, callback);
}

module.exports.getMentorByUsername = function(username, callback){
  const query = {username: username}
  Mentor.findOne(query, callback);
}
module.exports.getMentorByEmail = function(email, callback){
  const query = {email: email}
  Mentor.findOne(query, callback);
}

module.exports.addMentor = function(newMentor, callback){
  bcrypt.genSalt(10, (err, salt)=>{
    bcrypt.hash(newMentor.password, salt, (err, hash) => {
      if(err) throw err;
      newMentor.password = hash;
      newMentor.save(callback);
    })
  })
}

module.exports.updateMentor = function(newMentor, callback){
  newMentor.save(callback);
}

module.exports.hashPassword = function(newMentor, callback){
  bcrypt.genSalt(10, (err, salt)=>{
    bcrypt.hash(newMentor.password, salt, (err, hash) => {
      if(err) throw err;
      newMentor.password = hash;
      return callback;
      //newMentor.save(callback);
    })
  })
}



module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}
