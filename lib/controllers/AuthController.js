var utils = require('../utils/utils.js');
var config = require('../config.js');

var Client = require('../models/Client.js');
var User = require('../models/User.js');
var AccessToken = require('../models/AccessToken.js');
var RefreshToken = require('../models/RefreshToken.js');

module.exports = {
  authorize: function(key, userId, password, next) {
    Client.findOne({ key: key }, function(err, client) {
      if (err || !client) {
        return next('Invalid client');
      }

      User.findOne({ userId: userId }, function(err, user) {
        if (err) {
          return next(err);
        }

        utils.validatePassword(password, user.password, function(err, res) {
          if (err || !res) {
            return next('NOT valid', null);
          }
          createAccessToken(userId, client.title, next);
        });
      });
    });
  },

  authenticate: function(key, secret, accessCode, next) {
    Client.findOne({ key: key }, function(err, client) {
      if (err || !client) {
        return next("Invalid client");
      }

      AccessToken.findOne({ code: accessCode }, function(err, token) {
        if (err) {
          return next(err);
        } else if (!token) {
          return next("Token does not exist");
        }

        if (Date.now() > token.expires) {
          return next("Token has expired");
        }
        
        createRefreshToken(token.userId, client.title, next);
      });
    });
  }
};

var createAccessToken = function(userId, clientTitle, next) {
  var expires = utils.dateWithHoursFromNow(config['accessTokenExpiration']);

  utils.generateToken(config['accessTokenLength'], function(code) {
    var token = new AccessToken({
      userId: userId,
      code: code,
      expires: expires,
      clientTitle: clientTitle
    });

    token.save(function (err) {
      if (err) {
        return next(err);
      }
      next(null, token);
    });
  });
}

var createRefreshToken = function(userId, clientTitle, next) {
  var expires = utils.dateWithHoursFromNow(config['refreshTokenExpiration']);

  generateToken(config['refreshTokenLength'], function(code) {
    var token = new RefreshToken({
      userId: userId,
      code: code,
      expires: expires,
      clientTitle: clientTitle
    });

    token.save(function(err) {
      if (err) {
        return next(err);
      }
      next(null, token);
    });
  });
}

