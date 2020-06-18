const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const checkAuth = require("../models/middleware/middleware");

const userSchema = require("../models/schema/user");

// basic redirection

router.get("/", function (req, res, next) {
  res.render("message", { message_headind: "userpage", login: false });
});

router.get("/register", function (req, res, next) {
  res.render("register", { logged_in: req.session.logged_in });
});

// route which provide the data of all the users

router.get("/data", function (req, res, next) {
  userSchema
    .find()
    .exec()
    .then((doc) => {
      if (doc.length < 1) {
        res.send("No docuemnt found");
      }
      console.log(doc);
      res.status(200).json(doc);
    })
    .catch((err) => {
      console.error(err);
      res.status(201).json(err);
    });
});

// User Registration Section

router.post("/submit", function (req, res) {
  // validation before storing the database

  // check is all the fiels are provided or not
  if (
    !req.body.username ||
    !req.body.email ||
    !req.body.name ||
    !req.body.password
  ) {
    return res.render("message", {
      message_headind: "Fill in the details properly",
      message_body: "click on the register from the nav",
    });
  }

  if (req.body.password !== req.body.confirm_password) {
    res.render("message", {
      message_headind: "Password don't match",
      message_body: "click on the register from the nav",
    });
  }
  // Security measures Password length should be greator than 5
  if (req.body.password.length < 5) {
    res.render("message", {
      message_headind: "password length should be greator than 5",
    });
  } else {
    // checking if the username exists on the database or not
    userSchema
      .find({ username: req.body.username })
      .exec()
      .then((user) => {
        if (user.length >= 1) {
          console.log("Username already exists");
          res.render("message", { message_headind: "username already exists" });
        } else {
          // Store hash in your password DB.
          // converting the password in to hash
          bcrypt.hash(req.body.password, 10, function (err, hash) {
            if (
              (err) => {
                res.status(500).json({
                  message: err,
                });
              }
            );
            //creating a new userschema using the defined schema
            const userData = new userSchema({
              _id: new mongoose.Types.ObjectId(),
              name: req.body.name,
              email: req.body.email,
              username: req.body.username,
              hash: hash,
            });
            userData
              .save()
              .then((result) => {
                console.log(result.name + "   Registered");
                res.render("message", {
                  message_headind: "Registered",
                  message_body: "Re-directing to Login page in 3 seconds",
                  redirect_to_login: true,
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  error: err,
                });
              });
          });
        }
      })
      .catch((err) => {
        res.render("message", { message_headind: err });
      });
  }
});

//////////////////////////////////////

// User  Login Section

//////////////////////////////////////
router.get("/login", checkAuth, function (req, res) {
  res.redirect("/users/dashboard");
});

// display login page
router.get("/login/page", function (req, res) {
  return res.render("login", {
    title: "Login",
    logged_in: req.session.logged_in,
  });
});

// submit login form here

router.post("/login/submit", function (req, res, next) {
  // Validate data
  if (!req.body.username || !req.body.password) {
    res.render("message", { message_headind: "Fill in the details properly" });
  } else {
    userSchema
      .find({ username: req.body.username })
      .exec()
      .then((user) => {
        if (user.length < 1) {
          console.log("user not exist");
          res.render("message", {
            message_headind:
              "there's no user with that username. may be you want to register to our website",
          });
        }
        bcrypt.compare(req.body.password, user[0].hash, (err, result) => {
          if (err) {
            res.render("message", { message_headind: "Invalid login attempt" });
          }
          if (result) {
            var token = jwt.sign(
              {
                userId: user[0]._id,
                userName: user[0].username,
                name: user[0].name,
              },
              process.env.SECRET_KEY_JWT
            );
            req.session.userId = token;
            req.session.logged_in = true;
            //res.render("message", { message_headind: "welcome to dashboard" });
            // active_session = true;
            res.redirect("/users/dashboard");
          } else {
            res.render("message", {
              message_headind: "Invalid login attempt 2",
            });
          }
        });
      })
      .catch((err) => {
        console.log(err);
        res.render("message", {
          message_headind: "An error occured, please try again",
        });
      });
  }
});

// user dashboard once he/she has logged index

router.get("/dashboard", checkAuth, function (req, res, next) {
  var decoded = jwt.verify(req.session.userId, process.env.SECRET_KEY_JWT);
  res.render("dashboard", {
    name: decoded.name,
    logged_in: req.session.logged_in,
  });
  // if (req.session.userId) {
  //   console.log("inside dash")
  //   var decoded = jwt.verify(req.session.userId,process.env.SECRET_KEY_JWT);
  //   res.render("message", { message_headind: "Welcome "+ decoded.userName ,login:true, });
  // }
  // else{
  //   res.redirect('/')
  // }
});

//logout

router.get("/logout", function (req, res, next) {
  req.session.destroy(function (err) {
    if (err) {
      res.render("message", {
        message_headind: "inside dashboard",
        login: true,
      });
    }
    active_session = false;
    res.redirect("/users/login");
  });
});

// Delete user section

router.get("/delete", checkAuth, function (req, res, next) {
  res.render("delete_account", { logged_in: req.session.logged_in });
});

router.post("/delete", checkAuth, function (req, res, next) {
  if (!req.body.password) {
    res.render("message", {
      message_headind: "Enter the password",
      login: req.session.logged_in,
    });
  } else if (!req.body.message) {
    res.render("message", {
      message_headind: "FIll in the reason",
      login: req.session.logged_in,
    });
  } else {
    var decoded = jwt.verify(req.session.userId, process.env.SECRET_KEY_JWT);
    userSchema
      .find({ _id: decoded.userId })
      .exec()
      .then((user) => {
        bcrypt.compare(req.body.password, user[0].hash, (err, result) => {
          if (err) {
            res.render("message", { message_headind: "Invalid Password" });
          }

          if (result) {
            userSchema
              .remove({ _id: decoded.userId })
              .exec()
              .then((result) => {
               console.log(decoded.name + " deleted from database ")
               res.redirect("/users/logout")
              })
              .catch((err) => {
                res.status(500).json({
                  message: err,
                });
              });
          }
        });
      });
  }
});

// r
// router.delete("/delete/:userId", function (req, res, next) {
//   userSchema
//     .remove({ _id: req.params.userId })
//     .exec()
//     .then((result) => {
//       res.status(200).json({
//         message: "User deleted",
//       });
//     })
//     .catch((err) => {
//       res.status(500).json({
//         message: err,
//       });
//     });
// });
module.exports = router;
