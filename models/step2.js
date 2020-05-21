const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const axios = require('axios');
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/democraseed', ['step2']);
var request = require("request");

const Step2Schema = mongoose.Schema({
  title: {
    type:String,
    required: true
  },
  description: {
    type:String,
  }
})

const Step2 = module.exports = mongoose.model('Step2', Step2Schema);
module.exports.addStep2 = function(newStep2, callback){
  newStep2.save(callback);
}
