/**
 * Plug & Play OAuth for Node.JS
 *
 * @package node-oauth-module
 * @author Sjors Snoeren
 */

// Dependencies
var mongoose = require('mongoose');

// Controllers
var ClientController = require('../controllers/ClientController.js');
var UserControler = require('../controllers/UserController.js');
var AuthController = require('../controllers/AuthController.js');

var OAuth = function(options) {

  var defaults = {
    hostname: 'localhost',
    collection: 'oauth'
  };

  var options = options || defaults,
      _this = this;

  /**
   * Init MongoDB
   */
  var url = 'mongodb://' + options['hostname'] + 
                     '/' + options['collection'];

  mongoose.connect(url);

  this.db = mongoose.connection;
  this.db.on('error', console.error.bind(console, 'connection error:'));

  this.getHostname = function() {
    return options['hostname'];
  }

  /**
   * Create a new client
   */
  this.createClient = function(title, desc, next) {
    ClientController.create(title, desc, next);
  }

  /**
   * Create a new user
   */
  this.createUser = function(userId, password, next) {
    UserControler.create(userId, password, next);
  }

  this.findUser = function(token, next) {
    UserControler.findWithToken(token, next);
  }

  /**
   * Authentication
   */
  this.authorize = function(key, userId, password, next) {
    AuthController.authorize(key, userId, password, next);
  }

  this.authenticate = function(key, secret, accessCode, next) {
    AuthController.authenticate(key, secret, accessCode, next);
  }

  /**
   * Express middleware
   */
  this.initialize = function() {
    return function(req, res, next) {
      req.oauth2 = _this;
      next();
    }
  }
}

module.exports = OAuth;