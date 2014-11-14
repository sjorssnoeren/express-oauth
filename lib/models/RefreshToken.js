var mongoose = require('mongoose');

var refreshTokenSchema = new mongoose.Schema({
  userId: String,
  code: String, 
  expires: Date,
  clientTitle: String
});

module.exports = mongoose.model('RefreshToken', refreshTokenSchema);