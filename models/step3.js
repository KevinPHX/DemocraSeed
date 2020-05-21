const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const axios = require('axios');
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/democraseed', ['step3']);
var request = require("request");

const Step3Schema = mongoose.Schema({
  title: {
    type:String,
    required: true
  },
  description: {
    type:String,
  }
})

const Step3 = module.exports = mongoose.model('Step3', Step3Schema);
module.exports.addStep3 = function(newStep3, callback){
  newStep3.save(callback);
}
