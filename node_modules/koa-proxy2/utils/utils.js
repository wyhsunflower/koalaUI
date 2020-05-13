"use strict";

/*
 * module dependency
 */
var assert = require('assert');
var fs = require('fs');
var util = require('util');
var _ = require('underscore');
var parse = require('co-body');
var multipart = require('./multipart');

/**
 * Export several useful method
 * @module utils/utils
 * @author bornkiller <hjj491229492@hotmail.com>
 * @version v0.11.0
 * @license MIT
 * @copyright bornkiller NPM package 2014
 */

/**
 * @description normalize URL merge
 * @param {string} origin - the specific url path
 * @param {string} addition - another specific url path
 * @returns {string}
 */
exports.mergeSafeUrl = function(origin, addition) {
  switch (true) {
    case origin.endsWith('/') && addition.startsWith('/'):
      return origin + addition.slice(1);
      break;
    case !origin.endsWith('/') && !addition.startsWith('/'):
      return origin + '/' + addition;
      break;
    default:
      return origin + addition;
  }
};

/**
 * @description resolve rules match, return final URL when match, false when mismatch
 * @param {string} path - the http request path
 * @param {object} rules - the map relationship between origin request path and real backend API
 * @returns {boolean|string}
 */
exports.resolvePath = function(path, rules) {
  assert.ok(util.isArray(rules), 'Array Rules Required');
  var result = _.find(rules, function(rule) {
      return util.isRegExp(rule.proxy_location) ? rule.proxy_location.test(path) : rule.proxy_location === path;
    })
    , microServiceReg = /^\/(\w+)(\/?.*)$/
    , location;

  if (!result) return false;

  location = result.proxy_pass.replace(/^https?:\/\//, '');
  if (location.indexOf('/') !== -1 && !result.proxy_merge_mode) return result.proxy_pass;
  if (result.proxy_micro_service && microServiceReg.test(path)) path = microServiceReg.exec(path)[2];

  return this.mergeSafeUrl(result.proxy_pass, path);
};

/**
 * @description - whether should parse request body inner koa-proxy2
 * @param {object} self - koa request context
 * @param {object} options - configure options
 * @returns {Boolean}
 */
exports.shouldSkipNext = function(self, options) {
  return !this.resolvePath(self.path, options.proxy_rules) || options.proxy_methods.indexOf(self.method) === -1
};

/**
 * @description - whether should parse request body inner koa-proxy2
 * @param {object} self - koa request context
 * @param {object} options - passed options
 * @returns {Boolean}
 */
exports.shouldParseBody = function(self, options) {
  return !self.request.body && options.body_parse
};

/**
 * parse text, json, urlencoded HTTP body
 * @param {object} req - koa context
 * @returns {Function} - yieldable Object
 */
exports.resolveBody = function(req) {
  return parse(req);
};

/**
 * @description - choose right mode for parse request body
 * @param {object} self - koa request context
 * @param {boolean} debug - whether in UT environment
 * @returns {Object} - yieldable object
 */
exports.execParseBody = function(self, debug) {
  // parse body when raw-body
  if (_.isString(self.is('json', 'text', 'urlencoded'))) return !debug ? parse(self) : 'co-body';
  if (_.isString(self.is('multipart'))) return !debug ? multipart(self.req) : 'multipart';
  return {};
};

/**
 * @description - config body content for final HTTP request
 * @param {object} self - koa request context
 * @param {object} options - proxy config options
 * @returns {Object} - content configuration pass into request module
 */
exports.configRequestOptions = function(self, options) {
  // resolve available opts for request module
  var opts = {
    method: self.method,
    url: this.resolvePath(self.path, options.proxy_rules),
    headers: self.header,
    qs: !!options.keep_query_string ? self.query : {}
  };

  switch (true) {
    case _.isEmpty(self.request.body):
      break;
    case self.is('urlencoded') === 'urlencoded':
      opts.form = self.request.body;
      break;
    case self.is('multipart') === 'multipart':
      opts.formData = self.request.body;
      break;
    default:
      opts.body = self.request.body;
      opts.json = self.is('json') === 'json'
  }
  return opts;
};
