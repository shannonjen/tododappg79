const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.post('/login', function(req,res,next){
  passport.authenticate('local', {session: false}, function(err,user,info){
    if (err || !user) {
      return res.status(400).json({
        message: 'We have a problem',
        user: user
      })
    }
    req.login(user, {session:false}, function(err){
      if (err) {
        res.send(err);
      }
      const token = jwt.sign(user, 'your_jwt_secret');
      return res.render('user', user)
    })
  })
  (req,res)
})


module.exports = router;
