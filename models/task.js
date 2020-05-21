const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const axios = require('axios');
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/democraseed', ['tasks']);
var request = require("request");

const TaskSchema = mongoose.Schema({
  mentorid: {
    type: String,
    required: true
  },
  groupid: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    required: true
  }
})

const Task = module.exports = mongoose.model('Task', TaskSchema);
module.exports.addTask = function(newTask, callback){
  newTask.save(callback);
}
