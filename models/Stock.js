var mongoose = require('mongoose');

var StockSchema = new mongoose.Schema({
  code: {type: String, required: true},
  name: {type: String, required: true},
  newest: {type: Number},
  offset: {type: Number},
  offrate: {type: Number},
  high: {type: Number},
  low: {type: Number},
  close: {type: Number},
  open: {type: Number},
  volumn: {type: Number},
  turnover: {type: Number},
  date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Stock', StockSchema);
