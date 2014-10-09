/* globals require, module */
'use strict';

var path = require('path');

module.exports = function (app, rootPath) {
  var posts = require(path.join(rootPath, 'app/routes/posts'));
  var users = require(path.join(rootPath, 'app/routes/users'));

  app.use('/posts', posts);
  app.use('/users', users);
};
