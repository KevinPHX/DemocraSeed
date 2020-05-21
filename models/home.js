const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const axios = require('axios');
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/democraseed', ['home']);
var request = require("request");

const HomeSchema = mongoose.Schema({
  title:{
    type: String,
  },
  info:{
    type: String,
  },
  instructions:{
    type: String,
  },
  videolink:{
    type: String
  }
})

const Home = module.exports = mongoose.model('Home', HomeSchema);
module.exports.addHome = function(newHome, callback){
  newHome.save(callback);
}
