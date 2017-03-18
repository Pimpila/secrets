const express = require('express');
const router = express.Router();
module.exports = router;

const models = require('../db/models');
const Secret = models.Secret;
const Comment = models.Comment;

router.get('/', function (req, res, next) {
   Secret.findAll().then(function(secrets) {
    res.render('index.html', {secrets: secrets});
  })
});

router.get('/add', function (req, res, next) {
  res.render('add.html')
});

router.use('/:secretId/comments', require('./comments-subrouter'));

router.get('/:secretId', function (req, res, next) {
  Secret.findOne({
    where: {
      id: req.params.secretId
    }
  })
  .then(function(secret) {
    res.render('secret.html', {secret: secret});
  })
});

router.post('/', function (req, res, next) { // ??h ow is this getting sent aren't we on add?
  var newSecret = req.body.text;
   Secret.create({
    text: newSecret
  })
  .then(function(createdPage){
    res.redirect('/secrets');
  })
});

router.use('/:secretId/comments', require('./comments-subrouter'));
