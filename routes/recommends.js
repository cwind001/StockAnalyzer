var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Recommend = require('../models/Recommend.js');

/* GET /recommend listing. */
router.get('/', function(req, res, next) {
  Recommend.find(function (err, recommends) {
    if (err) return next(err);
    res.json(recommends);
  });
});

/* POST /recommend */
router.post('/', function(req, res, next) {
  Recommend.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /recommend/id */
router.get('/:id', function(req, res, next) {
  Recommend.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /recommend/:id */
router.put('/:id', function(req, res, next) {
  Recommend.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /recommend/:id */
router.delete('/:id', function(req, res, next) {
  Recommend.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
