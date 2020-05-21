const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const url = "mongodb://localhost:27017/democraseed";
var mongojs = require("mongojs");
var db = mongojs('users',['users']);
var fs = require('fs');
var multer = require('multer');
//var upload = multer({ dest: 'uploads/' })
const Image = require('./models/image');
//Connect To Database
mongoose.createConnection(config.database)

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
const mentors=require('./routes/mentors');
const administrators=require('./routes/administrators');
const user=require('./models/user');

//Port Number
const port = 3000;

//CORS Middleware
app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// app.use(multer({ dest: './uploads/',
//  rename: function (fieldname, filename) {
//    return filename;
//  },
// }), function(req, res, next){
//   console.log("multer middleware")
// });
app.use(multer({dest:'uploads/'}).any());

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser Middleware
// app.use(bodyParser.json());
app.use(bodyParser.json({limit: '50mb', extended: true}))
// app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);//passport

app.use('/users', users)
app.use('/mentors', mentors)
app.use('/administrators', administrators)



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
