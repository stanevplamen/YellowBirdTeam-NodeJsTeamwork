/* globals require, module */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
  text: String,
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

var Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
