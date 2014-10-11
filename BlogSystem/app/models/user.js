/* globals require, module */
'use strict';

var bcrypt = require('bcrypt-nodejs');
var uuid = require('uuid');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  registered: Date,
  salt: String,
  token: String
});

userSchema.methods.validatePassword = function(candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password);
};

userSchema.methods.generateToken = function() {
  var token = [];
  uuid.v1(null, token, 0);
  uuid.v1(null, token, 16);
  this.token = uuid.unparse(token) + uuid.unparse(token, 16);
  this.save();

  return this.token;
};

userSchema.statics.generateSalt = function () {
  return bcrypt.genSaltSync();
};

userSchema.statics.encrypt = function (pass, salt) {
  return bcrypt.hashSync(pass, salt);
};

var User = mongoose.model('User', userSchema);

module.exports = User;
