const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const config = require("../config/database")
const Administrator = require('../models/administrator');
const Home = require('../models/home');
const Intro = require('../models/intro');
const Step1 = require('../models/step1');
const Step2 = require('../models/step2');
const Step3 = require('../models/step3');
const Step4 = require('../models/step4');
const Step5 = require('../models/step5');
const Video = require('../models/video');
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
var assert = require('assert');


mongoose.connect(config.database)


router.post('/photo',function(req,res){
  console.log(req.files)
  for(var i = 0; i < req.files.length; i++){

    let newImage = new Image({
     img: {
       data: fs.readFileSync(req.files[i].path),
       contentType: 'image/png'
     },
   });
   newImage.save();
   fs.unlinkSync(req.files[i].path)
  }
});

router.get('/photo', function(req, res, next) {
    db.collection('images').find().toArray(function(err, images){
      if (err) res.send(err);
      res.json(images)
    })
})



nev.configure({
    verificationURL: 'http://localhost:4200/app1/email-verification/${URL}',
    persistentUserModel: Administrator,
    tempUserCollection: 'temporary_administrators',

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

nev.generateTempUserModel(Administrator);








//Register
router.post('/register', (req, res, next) => {
    let newAdministrator = new Administrator({
      role: "Administrator",
      administratorfirstname:req.body.firstname,
      administratorlastname:req.body.lastname,
      administratoremail:req.body.email,
      username: req.body.username,
      password: req.body.password,
    });

    nev.createTempUser(newAdministrator, function(err, existingPersistentUser, newTempUser) {
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
                res.json({success:false, msg:"Failed to register user"});
            }
        });


        Administrator.hashPassword(newAdministrator, (err, user) => {
          if(err){
            res.json({success:false, msg:"Failed to register user"});
          } else {
            res.json({success: true, msg:"User registered"});
          }
        });

})
////////////////////////////////////////////////////////////////////////////////

router.post("/match/:id/:mentorid", (req, res, next) => {

  db.collection("users").update(
    {_id: ObjectID(req.params.id)},
    {$set: {
      mentorid: req.params.mentorid
    }})
})

router.post("/home", (req, res, next) => {
  db.collection("homes").remove({}, function(err){
      if(err){
          res.send(err);
      }
      let newHome = new Home({
        title: req.body.title,
        info: req.body.info,
        instructions: req.body.instructions,
        videolink: req.body.videolink
      })
      Home.addHome(newHome, (err, home) => {
          if(err){
              res.json({success:false, msg:"Failed to add home page"});
            } else {
              res.json({success: true, msg:"Home page added", content: newHome});
            }
      })
  })
})

router.post("/intro", (req, res, next) => {
  db.collection("intros").remove({}, function(err){
    if(err){
        res.send(err);
    }
    let newIntro = new Intro({
      title: req.body.title,
      description: req.body.description
    })
    Intro.addIntro(newIntro, (err, intro) => {
        if(err){
            res.json({success:false, msg:"Failed to add home page"});
          } else {
            res.json({success: true, msg:"Home page added", content: newIntro});
          }
    })
  })
})


router.get("/contacts", (req, res, next) => {
  db.collection("administrators").find({}, function(err, user){
    if(err){
        res.send(err);
    }
    res.json(user)
  })
})



router.post("/step1", (req, res, next) => {
  db.collection("step1").remove({}, function(err){
      if(err){
          res.send(err);
      }
      console.log(req.body)
      let newStep1 = new Step1({
        title: req.body.title,
        description: req.body.description
      })
      Step1.addStep1(newStep1, (err, step1) => {
          if(err){
              res.json({success:false, msg:"Failed to add step 1 page"});
            } else {
              res.json({success: true, msg:"step 1 page added"});
            }
      })
  })
})
router.post("/step2", (req, res, next) => {
  db.collection("step2").remove({}, function(err){
      if(err){
          res.send(err);
      }
      let newStep2 = new Step2({
        title: req.body.title,
        description: req.body.description
      })
      Step2.addStep2(newStep2, (err, step2) => {
          if(err){
              res.json({success:false, msg:"Failed to add step 2 page"});
            } else {
              res.json({success: true, msg:"step 2 page added"});
            }
      })
  })
})
router.post("/step3", (req, res, next) => {
  db.collection("step3").remove({}, function(err){
      if(err){
          res.send(err);
      }
      let newStep3 = new Step3({
        title: req.body.title,
        description: req.body.description
      })
      Step3.addStep3(newStep3, (err, step3) => {
          if(err){
              res.json({success:false, msg:"Failed to add step 3 page"});
            } else {
              res.json({success: true, msg:"step 3 page added"});
            }
      })
  })
})
router.post("/step4", (req, res, next) => {
  db.collection("step4").remove({}, function(err){
      if(err){
          res.send(err);
      }
      let newStep4 = new Step4({
        title: req.body.title,
        description: req.body.description
      })
      Step4.addStep4(newStep4, (err, step4) => {
          if(err){
              res.json({success:false, msg:"Failed to add step 4 page"});
            } else {
              res.json({success: true, msg:"step 4 page added"});
            }
      })
  })
})
router.post("/step5", (req, res, next) => {
  db.collection("step5").remove({}, function(err){
      if(err){
          res.send(err);
      }
      let newStep5 = new Step5({
        title: req.body.title,
        description: req.body.description
      })
      Step5.addStep5(newStep5, (err, step5) => {
          if(err){
              res.json({success:false, msg:"Failed to add step 5 page"});
            } else {
              res.json({success: true, msg:"step 5 page added"});
            }
      })
  })
})

router.post("/order", (req, res, next) => {
  console.log(req.body)
 for (var i = 0; i < req.body._id.length; i++){
   db.collection("videos").update({_id: ObjectID(req.body._id[i])},
   {$set: {order: req.body.index[i]}}, function(err, user){
       if(err){
           res.send({success: false, msg:err});
       } else {
         if (i == req.body._id.length - 1) res.json({success: true, msg: user});
       }
   })
 }
})

router.post("/introvideos", (req, res, next) => {
  let newVideo = new Video({
    title:req.body.title,
    videolink:req.body.videolink,
    description:req.body.description,
    page: "intro",
    docname: req.body.docname,
    doclink: req.body.doclink
  })
  Video.addVideo(newVideo, (err, video) => {
      if(err){
          res.json({success:false, msg:"Failed to add Video"});
        } else {
          res.json({success: true, msg:"Video added", content: newVideo});
        }
  })
})

router.post("/step1videos", (req, res, next) => {
  let newVideo = new Video({
    title:req.body.title,
    videolink:req.body.videolink,
    description:req.body.description,
    page: "step1",
    docname: req.body.docname,
    doclink: req.body.doclink
  })
  Video.addVideo(newVideo, (err, video) => {
      if(err){
          res.json({success:false, msg:"Failed to add Video"});
        } else {
          res.json({success: true, msg:"Video added", content: newVideo});
        }
  })
})

router.post("/step2videos", (req, res, next) => {
  let newVideo = new Video({
    title:req.body.title,
    videolink:req.body.videolink,
    description:req.body.description,
    page: "step2",
    docname: req.body.docname,
    doclink: req.body.doclink
  })
  Video.addVideo(newVideo, (err, video) => {
      if(err){
          res.json({success:false, msg:"Failed to add Video"});
        } else {
          res.json({success: true, msg:"Video added", content: newVideo});
        }
  })
})

router.post("/step3videos", (req, res, next) => {
  let newVideo = new Video({
    title:req.body.title,
    videolink:req.body.videolink,
    description:req.body.description,
    page: "step3",
    docname: req.body.docname,
    doclink: req.body.doclink
  })
  Video.addVideo(newVideo, (err, video) => {
      if(err){
          res.json({success:false, msg:"Failed to add Video"});
        } else {
          res.json({success: true, msg:"Video added", content: newVideo});
        }
  })
})


router.post("/step4videos", (req, res, next) => {
  let newVideo = new Video({
    title:req.body.title,
    videolink:req.body.videolink,
    description:req.body.description,
    page: "step4",
    docname: req.body.docname,
    doclink: req.body.doclink
  })
  Video.addVideo(newVideo, (err, video) => {
      if(err){
          res.json({success:false, msg:"Failed to add Video"});
        } else {
          res.json({success: true, msg:"Video added", content: newVideo});
        }
  })
})

router.post("/step5videos", (req, res, next) => {
  let newVideo = new Video({
    title:req.body.title,
    videolink:req.body.videolink,
    description:req.body.description,
    page: "step5",
    docname: req.body.docname,
    doclink: req.body.doclink
  })
  Video.addVideo(newVideo, (err, video) => {
      if(err){
          res.json({success:false, msg:"Failed to add Video"});
        } else {
          res.json({success: true, msg:"Video added", content: newVideo});
        }
  })
})


router.delete('/deletevideo/:videoid', function(req, res, next){
    db.collection("videos").remove({_id: ObjectID(req.params.videoid)}, function(err, video){
        if(err){
            res.send(err);
        }
        res.json({success: true, msg: "Removed video"});
    });
});










router.get('/tasks/:groupid', function(req, res, next) {
    db.collection('tasks').find({_id: ObjectID(req.params.groupid)}).toArray(function(err, tasks){
      if (err) res.send(err);
      res.json(tasks)
    })
})

//update
router.post('/update/:id', (req, res, next) => {
  db.collection("administrators").update(
    {_id: ObjectID(req.params.id)},
    {$set: {
    administratorfirstname:req.body.firstname,
    administratorlastname:req.body.lastname,
    administratoremail:req.body.email,
    username: req.body.username}}, function(err, user){
        if(err){
          return res.json({success: false, msg: "An error occurred"})
        } else {
          return res.json({success:true, msg: "Your account has been updated"})
        }
    })
})



//Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  Administrator.getAdministratorByUsername(username, (err,user)=>{
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg:'User not Found'})
    }

    Administrator.comparePassword(password, user.password, (err, isMatch) =>{
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
            role: user.role,
            firstname: user.administratorfirstname,
            lastname: user.administratorlastname,
            username:user.username,
            email: user.administratoremail,
          }
        })
      } else {
        return res.json({success: false, msg:"Wrong password"})
      }
    });//How are tokens made
  })
});

//Profile
router.get('/profile', passport.authenticate('admin-rule', {session:false}), (req, res, next) => {
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
  // nev.configure({
  nev.confirmTempUser(url, function(err, user) {
    console.log(err)
      if (err)
          console.log(err)

      // user was found!
      if (user) {
        console.log(user)
        console.log(user['administratoremail'])
        console.log(user.administratoremail)
          // optional
        var smtpTrans = nodemailer.createTransport({
           service: 'Gmail',
           auth: {
            user: 'Administrator Email',
            pass: 'Administrator Password'
          }
        });
        var mailOptions = {

          to: user.administratoremail,
          from: 'Administrator Email',
          subject: 'Successfully Verified!',
          text: 'Your account has been successfully verified.'

        };

        smtpTrans.sendMail(mailOptions, function(err, info) {
          if (err) console.log(err);
          console.log(info)
        });
          // nev.sendConfirmationEmail(user['administratoremail'], function(err, info) {
          //     console.log("Successfully Verified")
          // });
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
      Administrator.findOne({ administratoremail: req.body.email }, function(err, user) {
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

        to: user.administratoremail,
        from: 'Administrator Email',
        subject: 'DemocraSeed Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://localhost:4200/app1/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'

      };
      console.log('step 3')

      smtpTrans.sendMail(mailOptions, function(err) {
        res.json({success: true, msg: 'An e-mail has been sent to ' + user.administratoremail + ' with further instructions.'});
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
  Administrator.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
      console.log(user);
    if (!user) {
      res.send({success: false, msg: 'Password reset token is invalid or has expired.'});
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
      Administrator.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user, next) {
        if (!user) {
          res.send({success: false, msg: 'Password reset token is invalid or has expired.'});
          //res.redirect('back');
        }

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
        to: user.administratoremail,
        from: 'email',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          ' - This is a confirmation that the password for your account ' + user.administratoremail + ' has just been changed.\n'
      };
      smtpTrans.sendMail(mailOptions, function(err) {
        res.json({success: true, msg: 'Success! Your password has been changed.'});
        done(err);
      });
    }




  ], function(err) {
    console.log(err)
    //res.redirect('/');
  });
});

module.exports = router;
