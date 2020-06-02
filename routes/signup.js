var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
    res.render('signup',{title:'Signup' });
});

router.post('/signup', function(req, res, next){
    const data = {
        name = req.body.get(name),
        username = req.body.get(username),
        password = req.body.get(password),
        confirm_password = req.body.get(confirm_pass),
    }
})

module.exports = router;