var mongoose = require('mongoose');

var accessTokenSchema = new mongoose.Schema({
  userId: String,
  code: String, 
  expires: Date,
  clientTitle: String
});

module.exports = mongoose.model('AccessToken', accessTokenSchema);