function Model(){
  this.keys = [];
  this.details = {};
}
Model.prototype.loadJSON = function(j){
  for ( var n in j ){
    this.addKeySet( n , j[n] );
  }
}
Model.prototype.addKeySet = function(key,array){
  var opts = this.details[key];
  if ( ! opts ){
    // missing opts
    this.details[key] = array;
    this.keys.push(key);
  }else{
    // already exists
    this.details[key] = opts.concat(array);
  }
}
Model.prototype.extend = function(key,f){
  if ( this.details[key] ){
    throw "Unable to extend ["+key+"] as it already exists."
  }
  this.details[key] = f;
  this.keys.push(key);
}
Model.prototype.fetch = function(key){
  var options = this.details[key];
  if ( ! options ) return false;
  if ( typeof options == 'function' ){
    // function - execute it.
    options = options();
  }
  if ( ! options ) return false;
  if ( options.push ){
    return options;
  }else{
    return [options]; // convert to array
  }
}

module.exports = Model;
