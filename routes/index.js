var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',active:"home" ,logged_in : req.session.logged_in});
});

// about page

router.get('/about', function(req, res, next) {
  res.render('about', { active :"about",logged_in : req.session.logged_in});
});


router.get('/terms', function(req, res, next) {
  res.render('terms', { logged_in : req.session.logged_in});
});

module.exports = router;
