var mongoose = require('mongoose');

var clientSchema = new mongoose.Schema({
  title: String,
  description: String,
  key: String,
  secret: String
});

module.exports = mongoose.model('Client', clientSchema);