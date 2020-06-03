const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = require("../models/schema/User")



router.get('/', function (req, res, next) {
  res.render('index', { title: 'Hey, there' });
});

router.get('/register', function (req, res, next) {
  res.render('register', { title: 'Register' });
});

router.get('/data', function (req, res, next) {
  userSchema.find()
    .exec()
    .then(doc => {
      if (doc.length<1) {
        res.send("No docuemnt found")
      }
      console.log(doc);
      res.status(200).json(doc)
    })
    .catch(err => {
      console.error((err));
      res.status(201).json(err)
    })

});
router.post('/submit', function (req, res) {
  if( !req.body.username || !req.body.email || !req.body.name || !req.body.password || req.body.password !== req.body.confirm_password)
  {
    res.render('message',
      { message_headind : "Fill in the details properly",
        message_body : "click on the register from the nav"
      },
    );

  }
  userSchema.find({username :username})
  .exec()
  .then(user => {
    if (user.length >= 1) {
      return res.status(409).json({
        message: "Mail exists"
      });
    } else {
      
        } else {
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash
          });
          user
            .save()
            .then(result => {
              console.log(result);
              res.status(201).json({
                message: "User created"
              });
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({
                error: err
              });
            });
        }
      });
    }
  });
});
  // Store hash in your password DB.
  bcrypt.hash(req.body.password, 10, function(err, hash) {
    if(err =>{
      res.status(500).json({
        message:err,
      })
    });
    const userData = new userSchema({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      hash: hash,
    });
    userData
      .save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Handling POST requests to /products",
          createdProduct: result
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

  
});

router.delete("/:userId", function (req, res, next) {
  userSchema.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message:"User deleted"
      });
    })
    .catch( err => {
        res.status(500).json({
          message : err,
        })
    });
})


module.exports = router;