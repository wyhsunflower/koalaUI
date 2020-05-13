"use strict";

var util =require('util');
var thunkify = require('thunkify');
var request = thunkify(require('request'));
var _ = require('underscore');
var utils = require('./utils/utils.js');

/**
 * @typedef {!Object} ProxyRule
 * @property {(string|RegExp)} proxy_location - URL match rule for specific path request proxy
 * @property {string} proxy_pass - target backend, different between with URL or not
 */

/**
 * A module proxy requests with nginx style
 * @version v0.11.0
 * @author bornkiller <hjj491229492@hotmail.com>
 * @license MIT
 * @copyright bornkiller NPM package 2014
 */

/**
 * @description A module proxy requests with nginx style
 * @module koa-proxy2
 * @requires utils
 * @param {Object} options - proxy config definition
 * @returns {Function} - generator function act koa middleware
 */
module.exports = function(options) {
  options = _.defaults(options || {}, {
    body_parse: true,
    keep_query_string: true,
    proxy_timeout: 3000,
    proxy_methods: ['GET', 'POST', 'PUT', 'DELETE'],
    proxy_rules: []
  });

  return function* (next) {
    // transfer request next when rules, methods mismatch
    if (utils.shouldSkipNext(this, options)) return yield next;

    // alias for koa context
    var self = this
      , opts;

    // skip body parse when parsed or disabled
    if (utils.shouldParseBody(self, options)) this.request.body = yield utils.execParseBody(self, false);

    // respond error when occur in body parse
    if (util.isError(this.request.body)) return this.status = 500;

    opts = utils.configRequestOptions(self, options);

    // comply the proxy
    var response = yield request(opts);

    // respond client
    this.status = response[0].statusCode;
    this.set(response[0].headers);
    this.body = response[0].body;
  };
};