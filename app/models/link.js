var db = require('../config');
var crypto = require('crypto');
var mongoose = require('mongoose');

// var Link = db.Model.extend({
//   tableName: 'urls',
//   hasTimestamps: true,
//   defaults: {
//     visits: 0
//   },
//   initialize: function() {
//     this.on('creating', function(model, attrs, options) {
//       var shasum = crypto.createHash('sha1');
//       shasum.update(model.get('url'));
//       model.set('code', shasum.digest('hex').slice(0, 5));
//     });
//   }
// });

var links = mongoose.Schema({
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: Number,
  userId: Number
});


var shorten = function(link) {
  var shasum = crypto.createHash('sha1');
  shasum.update(link);
  return shasum.digest('hex').slice(0, 5);
};

links.pre('save', function(next) {
  var code = shorten(this.url);
  this.code = code;
  next();
});

var Link = mongoose.model('Link', links);
// db.links.methods.remove = function() {};

module.exports = Link;

