/* globals require, __dirname, console */
'use strict';

var path = require('path');
var express = require('express');
var passport = require('passport');

var rootPath = path.normalize(__dirname);

var app = express();

require('./app/config/mongoose')('localhost:27017/blog', rootPath);

require('./app/config/passport')(passport);
require('./app/config/express')(app, rootPath);

require('./app/config/routes')(app, rootPath);

app.listen(3000);
console.log('Server running on port: 3000');
