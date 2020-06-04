const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = require("../models/schema/User")

router.get('/', function (req, res, next) {
  res.render('register', { title: 'Register' });
});

router.get('/register', function (req, res, next) {
  res.render('register', { title: 'Register' });
});


router.get('/data', function (req, res, next) {
  userSchema.find()
    .exec()
    .then(doc => {
      if (doc.length < 1) {
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

  if (!req.body.username || !req.body.email || !req.body.name || !req.body.password) {
    return res.render('message',
      {
        message_headind: "Fill in the details properly",
        message_body: "click on the register from the nav"
      },
    );
  }
  if (req.body.password !== req.body.confirm_password) {
    res.render('message',
      {
        message_headind: "Password don't match",
        message_body: "click on the register from the nav"
      },
    );
  }
  if(req.body.password.length < 5)
  {
	  res.render('message',{message_headind:"password length should be greator than 5"})
  }
  else {
    userSchema.find({ username: req.body.username })
      .exec()
      .then(user => {
        if (user.length >= 1) {
			console.log("Username already exists");
			res.render('message',{message_headind:"username already exists"});
		  }
        else {
          // Store hash in your password DB.
          bcrypt.hash(req.body.password, 10, function (err, hash) {
            if (err => {
              res.status(500).json({
                message: err,
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
                console.log(result.username + "Registered");
                res.render("message", { message_headind: result.username + "Registered", message_body: "goto login page" })
              });
          })
            .catch(err => {
              console.log(err);
              res.status(500).json({
                error: err
              });
            });
        }
	  })
	  .catch(err => {
		  res.render('message',{message_headind: err})
	  });
  }
});

router.delete("/:userId", function (req, res, next) {
  userSchema.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      res.status(500).json({
        message: err,
      })
    });
})


module.exports = router;