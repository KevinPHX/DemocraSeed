const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/meanauth";
var mongojs = require("mongojs");
var db = mongojs('users',['users']);
//Connect To Database
mongoose.createConnection(config.database);

//On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database ' +config.database)
});
//On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: ' +err)
});

const app = express();

const users=require('./routes/users');
const user=require('./models/user');

//Port Number
const port = 3000;

//CORS Middleware
app.use(cors());

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser Middleware
app.use(bodyParser.json());
//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);//passport

app.use('/users', users)

//Index Route
app.get('/', (req,res) => {
  res.send('Invalid Endpoint')
});

 app.get("*", (req, res) => {
   res.sendFile(path.join(__dirname, 'public/index.html'))
 });

//Start Server
app.listen(port, () => {
  console.log('Server started on port ' + port);
});
//Express POST
app.post("/dashboard",function (req, res) {
  var newId = req.body._id;
  db.users().find(_id, function(err, doc) {
    if (err) {
      error(res, "Failed to find user.");
    } else {
      res.sendFile('/dashboard', { root: '.' });
    }
  });
});

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var query = { role: "Passenger" };
  db.collection("users").find(query, {firstname: 1, lastname: 1, geometry: 1, _id: 0}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    const passengerstring = result;
    db.close();
  });
});


MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var query2 = { role: "driver" };
  db.collection("users").find(query2, {firstname: 1, lastname: 1, _id: 0}).toArray(function(err, result2) {
    if (err) throw err;
    console.log(result2);
    const driverstring = result2;
    db.close();
  });
});


app.use('/js', express.static(__dirname + '/js'));

app.get('/contacts', function(req, res){
  User.getUserById(function(err, id){
    if(err){
      throw err;
    }
    res.json(id)
  })
  //res.send('./public/index.html', {root:__dirname});

  })
