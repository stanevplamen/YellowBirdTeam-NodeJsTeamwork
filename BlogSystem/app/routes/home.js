/* globals require, module */
'use strict';

var router = require('express').Router();

router.get('/', function (req, res) {
    res.render('home');
});

module.exports = router;
