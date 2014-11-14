var utils = require('../utils/utils.js');

var User = require('../models/User.js');
var RefreshToken = require('../models/RefreshToken.js');

module.exports = {
  create: function(userId, password, next) {
    utils.hashPassword(password, function(hashedPassword) {

      var user = new User({ userId: userId, password: hashedPassword });
      user.save(function (err) {
        if (err) {
          return next(err);
        }
        next();
      });
    });
  },

  findWithToken: function(code, next) {
    RefreshToken.findOne({ code: code }, function(err, token) {
      if (err) {
        return next(err);
      } else if (!token) {
        return next("Token does not exist");
      }

      if (Date.now() > token.expires) {
        return next("Token has expired");
      }
      next(null, token.userId);
    });
  }
};