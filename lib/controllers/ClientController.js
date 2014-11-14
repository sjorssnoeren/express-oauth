var utils = require('../utils/utils.js');
var config = require('../config.js');

var Client = require('../models/Client.js');

module.exports = {
  create: function(title, desc, next) {
    utils.generateToken(config['clientKeyLength'], function(key) {
      utils.generateToken(config['clientSecretLength'], function(secret) {
        var client = new Client({
          title: title,
          desc: desc, 
          key: key,
          secret: secret
        });

        client.save(function(err) {
          if (err) {
            return next(err);
          }
          next(null, client);
        });
      });
    });
  }
};