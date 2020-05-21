const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const axios = require('axios');
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/tourneyreview', ['images']);
var request = require("request");

var ImageSchema = mongoose.Schema({
  img: {
    data: {
      type: Buffer
    },
    contentType: {
      type: String
    }
  },

});
var Image = module.exports = mongoose.model('Image',ImageSchema);
module.exports.addImage = function(newImage, callback){
  newImage.save(callback);
}
