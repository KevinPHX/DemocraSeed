const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const axios = require('axios');
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/democraseed', ['intro']);
var request = require("request");

const IntroSchema = mongoose.Schema({
  title: {
    type:String,
    required: true
  },
  description: {
    type:String,
  }
})

const Intro = module.exports = mongoose.model('Intro', IntroSchema);
module.exports.addIntro = function(newIntro, callback){
  newIntro.save(callback);
}
