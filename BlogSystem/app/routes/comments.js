/* globals require, module */
'use strict';

var lodash = require('lodash');
var passport = require('passport');
var router = require('express').Router();
var Post = require('mongoose').model('Post');
var Comment = require('mongoose').model('Comment');

router.get('/', function (req, res) {
  // getting the postId which is attached
  // to the req object in the config/routes file
  Post.findById(req.postId)
  .exec(function (err, post) {
    if (err) {
      return res.status(500).send(err);
    }

    if (!post) {
      return res.status(404).end();
    }

    Comment.find({post: post._id})
    .exec(function (err, comments) {
      if (err) {
        return res.status(500).send(err);
      }

      if (!comments) {
        res.status(200).json([]);
      }

      return res.status(200).json(comments);
    });
  });
});

router.post('/', passport.authenticate('bearer', { session: false }),
  function (req, res) {
    var newComment = new Comment({
      text: req.body.text,
      author: req.body.authorId,
      post: req.postId
    });

    newComment.save(function (err, comment) {
      if (err) {
        return res.status(500).send(err);
      }

      return res.status(201).json(comment);
    });
  }
);

router.get('/:cid', passport.authenticate('bearer', { session: false }),
  function (req, res) {
    Comment.findById(req.params.cid)
    .exec(function (err, comment) {
      if (err) {
        return res.status(500).send(err);
      }

      if (!comment) {
        return res.status(404).end();
      }

      return res.status(200).json(comment);
    });
  }
);

router.put('/:cid', passport.authenticate('bearer', { session: false }),
  function (req, res) {
    Comment.findById(req.params.cid)
    .exec(function (err, comment) {
      if (err) {
        return res.status(500).send(err);
      }

      if (!comment) {
        return res.status(404).end();
      }

      comment = lodash.merge(comment, req.body);
      comment.save(function (err, comment) {
        if (err) {
          return res.status(500).send(err);
        }

        return res.status(200).json(comment);
      });
    });
  }
);

router.delete('/:cid', passport.authenticate('bearer', { session: false }),
  function (req, res) {
    Comment.findById(req.params.cid)
    .exec(function (err, comment) {
      if (err) {
        return res.status(500).send(err);
      }

      if(!comment) {
        return res.status(404).end();
      }

      comment.remove(function (err) {
        if (err) {
          return res.status(500).send(err);
        }

        return res.status(204).end();
      });
    });
  }
);

module.exports = router;
