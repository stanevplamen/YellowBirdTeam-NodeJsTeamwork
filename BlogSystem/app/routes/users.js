/* globals require, module */
'use strict';

var router = require('express').Router();
var passport = require('passport');

router.post('/register', passport.authenticate('local-register', {
  successRedirect: '/',
  failureRedirect: '/users/register'
}));

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}));

module.exports = router;
