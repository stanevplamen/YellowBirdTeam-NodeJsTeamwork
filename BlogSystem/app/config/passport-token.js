/* globals require, module, process */
'use strict';

var BearerStrategy  = require('passport-http-bearer').Strategy;

module.exports = function (passport, userData) {
  passport.use(new BearerStrategy({}, function(token, done) {
    process.nextTick(function () {
      userData.findByToken(token)
        .then(function success(user) {
          if (!user) {
            return done(null, false);
          }

          return done(null, user);
        }, function error(err) {
          return done(err);
        });

    });
  }));
};
