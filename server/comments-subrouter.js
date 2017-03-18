const express = require('express');
const router = express.Router({
    mergeParams: true // so these routes can receive "secretId"
});
module.exports = router;

const models = require('../db/models');
const Secret = models.Secret;
const Comment = models.Comment;


router.post('/', function (req, res, next) {
    var secretId = req.params.secretId
    Secret.findOne({  //grab the secret instance using the secretId from params
        where: {
            id: secretId
        }
    })
    .then(function(secret) {
        Comment.create({  // create a new comment
        text: req.body.text
        })
        .then(function(newComment) {
            console.log('secret', secret);
            console.log('newComment', newComment)
            return newComment.setSecret(secret); // not working! says setSecret is not a func. able to log secret and newComment.
        })
    })
    .then(function(newComment) {
        res.render('secret.html', {secret: secret, comment: comment});
    })
});
