const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const axios = require('axios');
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/democraseed', ['step4']);
var request = require("request");

const Step4Schema = mongoose.Schema({
  title: {
    type:String,
    required: true
  },
  description: {
    type:String,
  }
})

const Step4 = module.exports = mongoose.model('Step4', Step4Schema);
module.exports.addStep4 = function(newStep4, callback){
  newStep4.save(callback);
}
