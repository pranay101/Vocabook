const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const userSchema = require("../models/schema/User")
router.get('/', function (req, res, next) {
    res.render('register', {title: 'Register'});
});

router.get('/data', function (req, res, next) {
    userSchema.find()
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc)
        })
        .catch(err => {
            console.error((err));
            res.status(201).json(err)
        })

});
router.post('/submit' , function (req, res){

    const userData = new userSchema({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email:req.body.email,
        username: req.body.username,
        hash: req.body.password,
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


module.exports = router;