/* globals require, __dirname, console */
'use strict';

var path = require('path');
var express = require('express');
var passport = require('passport');

var rootPath = path.normalize(__dirname);

var app = express();

require('./app/config/mongoose')('localhost:27017/blog', rootPath);
var userData = require('./app/data/user-data');

require('./app/config/passport-token')(passport, userData);
require('./app/config/express')(app, rootPath);

require('./app/config/routes')(app, rootPath, userData);

app.listen(3000);
console.log('Server running on port: 3000');
