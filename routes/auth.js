var express = require('express');
var router = express.Router();

var authorization = require('../authorization');
var token_ctl = require('../controller_token')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('./auth/login', { title: 'WELCOME' });
});

router.get('/login', function(req, res, next) {
  res.render('./auth/login', { title: 'WELCOME' });
});

router.post('/login', function(req, res, next) {
  if(req.body.email == '123' && req.body.password == '123'){
    token_ctl.getNewToken('123',function(token){
      res.cookie('token',token,{expires: new Date(Date.now() + 600000),httpOnly: true,maxAge:600000})
      res.redirect('/');
    })
  }else{
    res.redirect('/auth/login');
  }
});

module.exports = router;
