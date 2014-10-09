/* globals require, module */
'use strict';

var lodash = require('lodash');
var router = require('express').Router();
var Post = require('mongoose').model('Post');
var Comment = require('mongoose').model('Comment');

router.get('/', function (req, res) {
  Post.find().exec(function (err, posts) {
    if (err) {
      return res.status(500).send(err);
    }

    return res.status(200).json(posts);
  });
});

router.post('/', function (req, res) {
  Post.create(req.body, function(err, post) {
    if(err) {
      return res.status(500).send(err);
    }

    return res.status(201).json(post);
  });
});

router.get('/:id', function (req, res) {
  Post.findById(req.params.id)
  .populate('author')
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
        res.status(200).json({ post: post, comments: [] });
      }

      return res.status(200).json({ post: post, comments: comments });
    });
  });
});

router.put('/:id', function (req, res) {
  if(req.body._id) {
    delete req.body._id;
  }

  Post.findById(req.params.id)
  .exec(function (err, post) {
    if (err) {
      return res.status(500).send(err);
    }

    if(!post) {
      return res.status(404).end();
    }

    post = lodash.merge(post, req.body);
    post.save(function (err, post) {
      if (err) {
        return res.status(500).send(err);
      }

      return res.status(200).json(post);
    });
  });
});

router.delete('/:id', function (req, res) {
  Post.findById(req.params.id)
  .exec(function (err, post) {
    if (err) {
      return res.status(500).send(err);
    }

    if(!post) {
      return res.status(404).end();
    }

    post.remove(function (err) {
      if (err) {
        return res.status(500).send(err);
      }

      return res.status(204).end();
    });
  });
});

function isAuthorized(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.send(401);
}

module.exports = router;
