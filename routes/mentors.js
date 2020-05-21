const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const config = require("../config/database")
const Mentor = require('../models/mentor');
const Task = require("../models/task");
const Image = require('../models/image');
const bcrypt = require('bcryptjs');
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/democraseed');
var url = 'mongodb://localhost:27017/democraseed'
var request = require("request");
const mongoose = require('mongoose');
var nev = require('email-verification')(mongoose);
var nodemailer = require("nodemailer")
var async = require("async")
var crypto = require("crypto")
var ObjectID = require('mongodb').ObjectID;
var multer = require('multer');
var fs = require("fs");
const MongoClient = require('mongodb').MongoClient;
var assert = require('assert');


mongoose.connect(config.database)



nev.configure({
    verificationURL: 'http://localhost:4200/app2/email-verification/${URL}',
    persistentUserModel: Mentor,
    tempUserCollection: 'temporary_mentors',

    transportOptions: {
        service: 'Gmail',
        auth: {
            user: 'Administrator Email',
            pass: 'Administrator Password'
        }
    },
    verifyMailOptions: {
        from: 'Do Not Reply <Administrator Email>',
        subject: 'Please confirm account',
        html: 'Click the following link to confirm your account:</p><p>${URL}</p>',
        text: 'Please confirm your account by clicking the following link: ${URL}'
    }
}, function(error, options){
});

nev.generateTempUserModel(Mentor);








//Register
router.post('/register', (req, res, next) => {
    let newMentor = new Mentor({
      role:"Mentor",
      mentorfirstname:req.body.firstname,
      mentorlastname:req.body.lastname,
      mentoremail:req.body.email,
      username: req.body.username,
      password: req.body.password,
    });

    nev.createTempUser(newMentor, function(err, existingPersistentUser, newTempUser) {
        // some sort of error
            if (err)
                console.log(err)

            // user already exists in persistent collection...
            if (existingPersistentUser)
                console.log("You have already registered")

            // a new user
            if (newTempUser) {
                var URL = newTempUser[nev.options.URLFieldName];
                nev.sendVerificationEmail(req.body.email, URL, function(err, info) {
                    if (err)
                        console.log(err)

                    console.log("Email Sent")
                    res.json({success: true, msg:"User registered"});

                });

            // user already exists in temporary collection...
            } else {
                console.log("User already exists")
                res.json({success:false, msg:"User already exists"});
            }
        });


        Mentor.hashPassword(newMentor, (err, user) => {
          if(err){
            return res.json({success:false, msg:"Failed to register user"});
          } else {
            return res.json({success: true, msg:"User registered"});
          }
        });

})



router.post("/task/:id/:groupid", (req, res, next) => {
  console.log(req.body)
    let newTask = new Task({
      mentorid: req.params.id,
      groupid: req.params.groupid,
      content: req.body.content,
      completed: false
    })
    Task.addTask(newTask, (err, task) => {
        if(err){
            res.json({success:false, msg:"Failed to add task"});
          } else {
            res.json({success: true, msg:"Task added"});
          }
      })
})
router.delete('/removetask/:taskid', function(req, res, next){
    db.collection("tasks").remove({_id: db.ObjectId(req.params.taskid)}, function(err, task){
        if(err){
            res.json({success: false, msg: "failed"});
        } else {
          res.json({success: true, msg: "removed"});
        }
    });
});
router.get('/tasks/:groupid', function(req, res, next) {
    db.collection('tasks').find({groupid: req.params.groupid}).toArray(function(err, tasks){
      if (err) res.send(err);
      res.json(tasks)
    })
})

router.post("/permission/:groupid", (req, res, next) => {
    db.collection('users').update({_id: ObjectID(req.params.groupid)},
        {$set: {permission1: req.body.permission1, permission2: req.body.permission2, permission3: req.body.permission3, permission4: req.body.permission4, permission5: req.body.permission5}});
})







//update
router.post('/update/:id', (req, res, next) => {
  db.collection("mentors").update(
    {_id: ObjectID(req.params.id)},
    {$set: {role:req.body.role,
    mentorfirstname:req.body.firstname,
    mentorlastname:req.body.lastname,
    mentoremail:req.body.email,
    username: req.body.username,}}, function(err){
      if(err){
          res.send(err);
      }
  })
})


//Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  Mentor.getMentorByUsername(username, (err,user)=>{
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg:'User not Found'})
    }

    Mentor.comparePassword(password, user.password, (err, isMatch) =>{
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign(user,config.secret, {
          expiresIn: 604800 //1 week
        });
        res.json({
          success:true,
          token:'JWT '+token,
          user:{
            id:user._id,
            firstname: user.mentorfirstname,
            lastname: user.mentorlastname,
            username:user.username,
            email: user.mentoremail,
            role: user.role
          }
        })
      } else {
        return res.json({success: false, msg:"Wrong password"})
      }
    });//How are tokens made
  })
});

//Profile
router.get('/profile', passport.authenticate('mentor-rule', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});




router.get('/contacts', function(req, res, next){
    db.collection("mentors").find(function(err, mentors){
        if(err){
            res.send(err);
        }
        res.json(mentors);
    });
});
router.get('/contact/:id', function(req, res, next){
    db.collection("mentors").find({_id: ObjectID(req.params.id)}, function(err, mentors){
        if(err){
            res.send(err);
        }
        res.json(mentors);
    });
});

router.delete('/delete/:id', function(req, res, next){
    db.collection("mentors").remove({_id: db.ObjectId(req.params.id)}, function(err, mentors){
        if(err){
            res.send(err);
        }
        res.json(mentors);
    });
});



router.get('/email-verification/:URL', function(req, res){
  var url = req.params.URL;
nev.confirmTempUser(url, function(err, user) {
    if (err)
        console.log(err)

    // user was found!
    if (user) {

        // optional
        nev.sendConfirmationEmail(user['email'], function(err, info) {
            console.log("Successfully Verified")
        });
    }

    // user's data probably expired...
    else
        console.log("User data expired")
});
})

router.post('/forgot', function(req, res, next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      Mentor.findOne({ mentoremail: req.body.email }, function(err, user) {
        if (!user) {
        //   console.log('error', 'No account with that email address exists.');
        return res.json({success: false, msg: 'No account with that email address exists.'});
        //res.redirect('/forgot');
        }
console.log('step 1')
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
        console.log('step 2')


      var smtpTrans = nodemailer.createTransport({
         service: 'Gmail',
         auth: {
          user: 'email',
          pass: 'password'
        }
      });
      var mailOptions = {

        to: user.mentoremail,
        from: 'Administrator Email',
        subject: 'DemocraSeed Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://localhost:4200/app2/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'

      };
      console.log('step 3')

        smtpTrans.sendMail(mailOptions, function(err) {
        res.json({success: true, msg: 'An e-mail has been sent to ' + user.mentoremail + ' with further instructions.'});
        console.log('sent')
        //res.redirect('/forgot');
});
}
  ], function(err) {
    console.log('this err' + ' ' + err)
    res.send(err)
    //res.redirect('/');
  });
});

router.get('/forgot', function(req, res) {
  res.render('forgot', {
    User: req.user
  });
});

router.get('/reset/:token', function(req, res) {
  Mentor.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
      console.log(user);
    if (!user) {
      res.json({success: false, msg:'Password reset token is invalid or has expired.'});
      //res.redirect('/forgot');
    }
    res.render('reset', {
     User: req.user
    });
  });
});




router.post('/reset/:token', function(req, res) {
  async.waterfall([
    function(done) {
      Mentor.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user, next) {
        if (!user) {
          res.json({success: false, msg:'Password reset token is invalid or has expired.'});
          //res.redirect('back');
        } else {

        user.password = req.body.password

        bcrypt.genSalt(10, (err, salt)=>{
          bcrypt.hash(user.password, salt, (err, hash) => {
            if(err) throw err;
            user.password = hash;




        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        console.log('password' + user.password  + 'and the user is' + user)

user.save(function(err) {
  if (err) {
      console.log('here')
      //res.redirect('back');
  } else {
      console.log('here2')
    // req.logIn(user, function(err) {
     done(err, user);
    // });

  }
        });
      })
    })


  }
      });
    },





    function(user, done) {
        console.log('got this far 4')
      var smtpTrans = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'Administrator Email',
          pass: 'Administrator Password'
        }
      });
      var mailOptions = {
        to: user.mentoremail,
        from: 'Administrator Email',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          ' - This is a confirmation that the password for your account ' + user.mentoremail + ' has just been changed.\n'
      };
      smtpTrans.sendMail(mailOptions, function(err) {
        res.json({success:true, msg:'Success! Your password has been changed.'});
        done(err);
      });
    }




  ], function(err) {
    console.log(err)
    //res.redirect('/');
  });
});

module.exports = router;
