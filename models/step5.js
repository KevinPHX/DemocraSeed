const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const axios = require('axios');
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/democraseed', ['step5']);
var request = require("request");

const Step5Schema = mongoose.Schema({
  title: {
    type:String,
    required: true
  },
  description: {
    type:String,
  }
})

const Step5 = module.exports = mongoose.model('Step5', Step5Schema);
module.exports.addStep5 = function(newStep5, callback){
  newStep5.save(callback);
}
