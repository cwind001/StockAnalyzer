var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Holding = require('../models/Holding.js');

/* GET /holdings listing. */
router.get('/', function(req, res, next) {
  Holding.find(function (err, holdings) {
    if (err) return next(err);
    res.json(holdings);
  });
});

/* POST /holdings */
router.post('/', function(req, res, next) {
  Holding.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /holdings/id */
router.get('/:id', function(req, res, next) {
  Holding.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /holdings/:id */
router.put('/:id', function(req, res, next) {
  Holding.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /holdings/:id */
router.delete('/:id', function(req, res, next) {
  Holding.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
