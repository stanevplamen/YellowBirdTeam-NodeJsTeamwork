/* globals require, module */
'use strict';

var path = require('path');

module.exports = function (app, rootPath) {
  var home = require(path.join(rootPath, 'app/routes/home'));
  var posts = require(path.join(rootPath, 'app/routes/posts'));
  var users = require(path.join(rootPath, 'app/routes/users'));

  app.use('/home', home);
  app.use('/posts', posts);
  app.use('/users', users);
  app.get('*', function(req, res) {
    res.render('layout');
  });
};
