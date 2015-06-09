var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Stock = require('../models/Stock.js');

/* GET /stocks listing. */
router.get('/', function(req, res, next) {
  Stock.find(function (err, stocks) {
    if (err) return next(err);
    res.json(stocks);
  });
});

router.get('/topvolumn', function(req, res, next){
  Stock.find({}, null, {limit:20, sort:{volumn:-1}}, function (err, stocks) {
  if (err) return next(err);
    res.json(stocks);
  });
});

router.get('/toprate', function(req, res, next){
  Stock.find({}, null, {limit:20, sort:{offrate:-1}}, function (err, stocks) {
  if (err) return next(err);
    res.json(stocks);
  });
});

/* POST /stocks */
router.post('/', function(req, res, next) {
  Stock.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /stocks/id */
router.get('/:id', function(req, res, next) {
  Stock.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /stocks/:id */
router.put('/:id', function(req, res, next) {
  Stock.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /stocks/:id */
router.delete('/:id', function(req, res, next) {
  Stock.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
