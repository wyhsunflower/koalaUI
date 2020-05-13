var fs = require('fs');
var formidable = require('formidable');

/**
 * parse multipart/form-data body and stream next
 * @param {object} req - koa context or koa request wrapper
 * @param {object} opts - options pass to formidable module
 * @returns {Function} - yieldable function
 */
module.exports = function(req, opts) {
  return function(done) {
    var data = {};
    var form = new formidable.IncomingForm(opts);
    form
      .on('field', function(name, value) {
        data[name] = value;
      })
      .on('file', function(name, file) {
        data[name] = fs.readFileSync(file.path)
      })
      .on('error', function(error) {
        done(error);
      })
      .on('end', function() {
        done(null, data);
      });
    form.parse(req);
  }
};