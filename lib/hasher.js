var crypto = require('crypto');
var stream = require('stream');
var util   = require("util");

var Hasher = function() {
  stream.Stream.call(this);
  this.writable = true;
  this.shasum = crypto.createHash('sha1');
};

util.inherits(Hasher, stream);

Hasher.prototype.write = function(data) {
  this.shasum.update(data);
  this.emit('data', data);
};

Hasher.prototype.end = function(data) {
  if(data) this.write(data);
  var digest = this.shasum.digest('hex');
  this.emit('end', digest);
};

module.exports = Hasher;
