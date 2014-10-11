/* globals require, module */
'use strict';

var router = require('express').Router();
var passport = require('passport');

module.exports = function (usersData) {
  router.post('/register', function (req, res) {
    usersData.register(req.body)
      .then(function success(user) {
        res.status(201).json(user);
      }, function error(err) {
        res.status(500).send(err);
      });
  });

  router.post('/login', function (req, res) {
    usersData.login(req.body)
      .then(function success(loggedUser){
        res.status(200).json(loggedUser);
      }, function error(err) {
        res.status(400).send(err);
      });
  });

  router.put('/logout', passport.authenticate('bearer', { session: false }),
    function(req, res) {
      usersData.logout(req.user)
        .then(function success() {
          res.status(200).end();
        }, function error(err) {
          res.status(400).send(err);
        });
    }
  );

  return router;
};
