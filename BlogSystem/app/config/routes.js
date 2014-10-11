/* globals require, module */
'use strict';

var path = require('path');

module.exports = function (app, rootPath, userData) {
  var posts = require(path.join(rootPath, 'app/routes/posts'));
  var comments = require(path.join(rootPath, 'app/routes/comments'));
  var users = require(path.join(rootPath, 'app/routes/users'))(userData);

  app.use('/posts', posts);

  app.use('/posts/:pid/comments', function (req, res, next) {
    req.postId = req.params.pid;
    next();
  }, comments);

  app.use('/users', users);
};
