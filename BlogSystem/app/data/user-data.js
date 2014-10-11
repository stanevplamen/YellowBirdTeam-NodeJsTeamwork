/* globals require, module */
'use strict';

var Q = require('q');
var User = require('mongoose').model('User');

var factory = {};

factory.register = function (user) {
  var deferred = Q.defer();

  User.findOne({email: user.email})
    .exec(function (err, userFromDb) {
      if(err) {
        return deferred.reject(err);
      }

      if (userFromDb) {
        return deferred.reject({message: 'Email is already taken'});
      }

      var salt = User.generateSalt();
      var newUser = new User({
        name: user.name,
        email: user.email,
        registered: Date.now(),
        token: '',
        salt: salt,
        password: User.encrypt(user.password, salt)
      });

      newUser.save(function (err, saved) {
        if (err) {
          return deferred.reject(err);
        }

        return deferred.resolve({
          name: saved.name,
          email: saved.email,
          registered: saved.registered
        });
      });

    });

  return deferred.promise;
};

factory.login = function (user) {
  var deferred = Q.defer();

  User.findOne({email: user.email})
    .exec(function (err, dbUser) {
      if(err) {
        return deferred.reject(err);
      }

      if (!dbUser) {
        return deferred.reject({message: 'Incorrect email'});
      }

      if (!dbUser.validatePassword(user.password)) {
        return deferred.reject({message: 'Incorrect password'});
      }

      var token = dbUser.generateToken();
      deferred.resolve({
        name: dbUser.name,
        email: dbUser.email,
        token: token
      });
    });

  return deferred.promise;
};

factory.logout = function (user) {
  var deferred = Q.defer();

  User.findOne({token: user.token})
    .exec(function (err, user) {
      if (err) {
        return deferred.reject(err);
      }

      if (!user) {
        deferred.reject({message: 'Invalid token'});
      }

      user.token = '';
      user.save(function (err, saved) {
        if (err) {
          deferred.reject({message: 'Could not log you out'});
        }

        return deferred.resolve(saved);
      });
    });

  return deferred.promise;
};

factory.findByToken = function (token) {
  var deferred = Q.defer();

  User.findOne({token: token})
    .exec(function (err, user) {
      if (err) {
        return deferred.reject(err);
      }

      return deferred.resolve(user);
    });

  return deferred.promise;
};

module.exports = factory;
