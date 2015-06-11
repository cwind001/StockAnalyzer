var mongoose = require('mongoose');

var RecommendSchema = new mongoose.Schema({
  keyword: {type: String, required: true},
  code: {type: String, required: true},
  name: {type: String, required: true},
  newest: {type: Number},
  offset: {type: Number},
  offrate: {type: Number},
  confidencescore: {type: Number},
  close: {type: Number},
  open: {type: Number},
  date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Recommend', RecommendSchema);
