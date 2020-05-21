const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const axios = require('axios');
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/democraseed', ['videos']);
var request = require("request");

const VideoSchema = mongoose.Schema({
  title:{
    type: String,
  },
  videolink:{
    type: String,
    required: true
  },
  description:{
    type: String,
  },
  page:{
    type: String,
    required: true
  },
  docname: {
    type: String
  },
  doclink: {
    type: String
  }
})

const Video = module.exports = mongoose.model('Video', VideoSchema);
module.exports.addVideo = function(newVideo, callback){
  newVideo.save(callback);
}
