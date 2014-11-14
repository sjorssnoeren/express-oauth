var bcrypt = require('bcrypt');
var crypto = require('crypto');

module.exports = {
  generateToken: function(len, next) {
    crypto.randomBytes(len, function(ex, buf) {
      next(buf.toString('hex'));
    });
  },

  validatePassword: function(password, hash, next) {
    bcrypt.compare(password, hash, function(err, res) {
      next(err, res);
    });
  },

  hashPassword: function(password, next) {
    bcrypt.hash(password, 10, function(err, hash) {
      if (err) {
        return next(err);
      }
      next(hash);
    });
  },

  dateWithHoursFromNow: function(hours) {
    var seconds = hours * 60 * 60;
    return new Date(Date.now() + (1000 * seconds));
  }
};