var core = require("generative-core");

var Model = require("./model");
var Generator = require("./generator");

function Words(){
  this.model = new Model();
}
Words.prototype.loadJSONModel = function( src ){
  this.model.loadJSON(src);
  return this;
}
Words.prototype.extendModel = function( key , f ){
  this.model.extend(key,f);
  return this;
}
Words.prototype.generate = function( opts ){
  if ( ! opts ) opts = {};
  if ( !opts.reporter ) opts.reporter = core.Reporter.console;
  if ( !opts.random ) opts.random = new core.Seeded(0);
  return new Generator( this.model , opts );
}

module.exports = Words;
