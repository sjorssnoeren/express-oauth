/**
 * Users
 */

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({ 
  userId: {
    type: String,
    unique: true
  }, 
  password: String
});

module.exports = mongoose.model('User', userSchema);