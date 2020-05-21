const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const config = require("../config/database")
const User = require('../models/user');
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
var assert = require('assert');


mongoose.connect(config.database)


// router.post('/photo',function(req,res){
//   for(var i = 0; i < req.files.length; i++){
//     let newImage = new Image({
//      img: {
//        data: fs.readFileSync(req.files[i].path),
//        contentType: 'image/png'
//      },
//    });
//    newImage.save();
//    fs.unlinkSync(req.files[i].path)
//   }
// });
//
router.get('/photo', function(req, res, next) {
    db.collection('images').find().toArray(function(err, images){
      if (err) res.send(err);
      res.json(images)
    })
})

nev.configure({
    verificationURL: 'http://localhost:4200/email-verification/${URL}',
    persistentUserModel: User,
    tempUserCollection: 'temporary_users',

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

nev.generateTempUserModel(User);








//Register
router.post('/register', (req, res, next) => {


    let newUser = new User({
      role: "User",
      groupname:req.body.groupname,
      cityname:req.body.cityname,
      advisorfirstname:req.body.advisorfirstname,
      advisorlastname:req.body.advisorlastname,
      advisoremail:req.body.advisoremail,
      username: req.body.username,
      password: req.body.password,
      memberlist: req.body.memberlist,
      permission1: false,
      permission2: false,
      permission3: false,
      permission4: false,
      permission5: false,
    });

    nev.createTempUser(newUser, function(err, existingPersistentUser, newTempUser) {
    // some sort of error
        if (err)
            console.log(err)

        // user already exists in persistent collection...
        if (existingPersistentUser)
            console.log("You have already registered")

        // a new user
        if (newTempUser) {
            var URL = newTempUser[nev.options.URLFieldName];
            nev.sendVerificationEmail(req.body.advisoremail, URL, function(err, info) {
                if (err)
                    console.log(err)

                console.log("Email Sent")
                res.json({success: true, msg:"User registered"});

            });

        // user already exists in temporary collection...
        } else {
            console.log("User already exists")
            res.json({success:false, msg:"Failed to register user"});
        }
    });


        User.hashPassword(newUser, function(err, user){
          console.log("user")
          if(err){
            res.json({success:false, msg:"Failed to register user"});
          } else {
            res.json({success: true, msg:"User registered"});
          }
        });

})
////////////////////////////////////////////////////////////////////////////////
router.get("/home", (req, res, next) => {
  db.collection("homes").find(function(err, home){
      if(err){
          res.send(err);
      }
      res.json(home);
  });
})


router.get("/intro", (req, res, next) => {
  db.collection("intros").find(function(err, intro){
      if(err){
          res.send(err);
      }
      res.json(intro);
  });
})

router.get("/step1", (req, res, next) => {
  db.collection("step1").find(function(err, step1){
      if(err){
          res.send(err);
      }
      res.json(step1);
  });
})
router.get("/step2", (req, res, next) => {
  db.collection("step2").find(function(err, step2){
      if(err){
          res.send(err);
      }
      res.json(step2);
  });
})
router.get("/step3", (req, res, next) => {
  db.collection("step3").find(function(err, step3){
      if(err){
          res.send(err);
      }
      res.json(step3);
  });
})
router.get("/step4", (req, res, next) => {
  db.collection("step4").find(function(err, step4){
      if(err){
          res.send(err);
      }
      res.json(step4);
  });
})
router.get("/step5", (req, res, next) => {
  db.collection("step5").find(function(err, step5){
      if(err){
          res.send(err);
      }
      res.json(step5);
  });
})



router.get("/introvideos", (req, res, next) => {
  db.collection("videos").find({page: "intro"}).sort({order: 1}).toArray(function(err, intro){
      if(err){
          res.send(err);
      }
      res.json(intro);
  });
})

router.get("/step1videos", (req, res, next) => {
  db.collection("videos").find({page: "step1"}).sort({order: 1}).toArray(function(err, step1){
      if(err){
          res.send(err);
      }
      res.json(step1);
  });
})
router.get("/step2videos", (req, res, next) => {
  db.collection("videos").find({page: "step2"}).sort({order: 1}).toArray(function(err, step2){
      if(err){
          res.send(err);
      }
      res.json(step2);
  });
})
router.get("/step3videos", (req, res, next) => {
  db.collection("videos").find({page: "step3"}).sort({order: 1}).toArray(function(err, step3){
      if(err){
          res.send(err);
      }
      res.json(step3);
  });
})
router.get("/step4videos", (req, res, next) => {
  db.collection("videos").find({page: "step4"}).sort({order: 1}).toArray(function(err, step4){
      if(err){
          res.send(err);
      }
      res.json(step4);
  });
})
router.get("/step5videos", (req, res, next) => {
  db.collection("videos").find({page: "step5"}).sort({order: 1}).toArray(function(err, step5){
      if(err){
          res.send(err);
      }
      res.json(step5);
  });
})






router.get('/tasks/:id', function(req, res, next) {
    db.collection('tasks').find({groupid: req.params.id}).toArray(function(err, tasks){
      if (err) res.send(err);
      res.json(tasks)
    })
})


router.post("/complete/:taskid", (req, res, next) => {
  db.collection("tasks").update(
    {_id: ObjectID(req.params.taskid)},
    {$set: {completed: True}}, function(err){
      if (err) res.send(err);
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

//update
router.post('/update/:id', (req, res, next) => {
  db.collection("users").update(
    {_id: ObjectID(req.params.id)},
    {$set: {groupname:req.body.groupname,
    cityname:req.body.cityname,
    advisorfirstname:req.body.advisorfirstname,
    advisorlastname:req.body.advisorlastname,
    advisoremail:req.body.advisoremail,
    username: req.body.username,
    memberlist: req.body.memberlist}}, function(err, user){
      console.log("god damn it")
      if (err){
        return res.json({success: false, msg: "An error occurred"})
      } else {
        console.log("users")
        return res.json({success:true, msg: "Your account has been updated"})
      }
    })
})

//Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err,user)=>{
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg:'User not Found'})
    }

    User.comparePassword(password, user.password, (err, isMatch) =>{
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
            firstname: user.firstname,
            lastname: user.lastname,
            username:user.username,
            email: user.email,
            role: user.role,
          }
        })
      } else {
        return res.json({success: false, msg:"Wrong password"})
      }
    });//How are tokens made
  })
});

//Profile
router.get('/profile', passport.authenticate('user-rule', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});




router.get('/contacts', function(req, res, next){
    db.users.find(function(err, users){
        if(err){
            res.send(err);
        }
        res.json(users);
    });
});

router.get('/contact/:id', function(req, res, next){
    db.users.find({_id: ObjectID(req.params.id)}, function(err, users){
        if(err){
            res.send(err);
        }
        res.json(users);
    });
});
router.get('/contactmentor/:mentorid', function(req, res, next){
    db.users.find({mentorid: req.params.mentorid}, function(err, users){
        if(err){
            res.send(err);
        }
        res.json(users);
    });
});



router.delete('/delete/:id', function(req, res, next){
    db.users.remove({_id: db.ObjectId(req.params.id)}, function(err, user){
        if(err){
            res.send(err);
        }
        res.json(user);
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
        nev.sendConfirmationEmail(user['advisoremail'], function(err, info) {
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
      User.findOne({ email: req.body.email }, function(err, user) {
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
          user: 'Administrator Email',
          pass: 'Administrator Password'
        }
      });
      var mailOptions = {

        to: user.email,
        from: 'Administrator Email',
        subject: 'DemocraSeed Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://localhost:4200/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'

      };
      console.log('step 3')

        smtpTrans.sendMail(mailOptions, function(err) {
        res.json({success: true, msg: 'An e-mail has been sent to ' + user.email + ' with further instructions.'});
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
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
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
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user, next) {
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
        to: user.email,
        from: 'Administrator Email',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          ' - This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      };
      smtpTrans.sendMail(mailOptions, function(err) {
        res.json({success: true, msg: 'Your password has been changed.'});
        done(err);
      });
    }




  ], function(err) {
    console.log(err)
    //res.redirect('/');
  });
});

module.exports = router;
