const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const axios = require('axios');
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/democraseed', ['step1']);
var request = require("request");

const Step1Schema = mongoose.Schema({
  title: {
    type:String,
    required: true
  },
  description: {
    type:String,
  }
})

const Step1 = module.exports = mongoose.model('Step1', Step1Schema);
module.exports.addStep1 = function(newStep1, callback){
  newStep1.save(callback);
}
