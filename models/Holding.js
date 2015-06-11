var mongoose = require('mongoose');

var HoldingSchema = new mongoose.Schema({
  code: {type: String, required: true},
  name: {type: String, required: true},
  newest: {type: Number},
  amount: {type: Number},
  date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Holding', HoldingSchema);
