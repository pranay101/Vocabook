const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
        if (req.session.userId) {
            try {
                console.log("inside dashboard");
                next();
            } catch (error) {
                console.log(error);
                res.redirect('/');
            }
            
          }
          else{
            console.log("inside catch"); 
            return res.redirect('/users/login/page');
          }
    
    
    
};