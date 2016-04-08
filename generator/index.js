var re = new RegExp("\\[([-A-Za-z]+)([0-9]+)?\\]");

function Generator( model , opts ){
  this.model = model;
  this.opts = opts||{};
  this.reporter = this.opts.reporter;
  this.random = this.opts.random;
  this.string = null;
}
Generator.prototype.toString = function( s ){
  var i = new Instance(this, s||"S" );
  return i.toString();
}

function Instance(gen,s){
  this.gen = gen;
  this.model = gen.model;
  this.random = function(){ return gen.random.next() };
  this.reporter = gen.reporter;
  this.s = s;
  this.backrefs = {};
}
Instance.prototype.solve = function(k,trace,excludes){
  var key = k.toUpperCase();
  var n = this.model.fetch(key,this.random );
  // n is the array of possible solutions.
  if ( (!n) || (n.length == 0) ){
    this.reporter.warn("Unable to find any options for "+key+"   ["+trace+"]")
    return null;
  }else{
    // try solutions
    var offset = Math.floor(this.random() * n.length);
    for ( var i=0 ; i< n.length ; i++){
      var index = (i+offset) % n.length;
      var s = this.unpack(n[index],trace+"->"+key+"("+index+")");
      if ( excludes ){
        if ( excludes.indexOf(s) != -1 ) s = null; // ignore any in the excludes list
      }
      if ( s != null ) return s; // found a solution...
    }
    this.reporter.warn("Unable to find any VALID options for "+key+"   ["+trace+"]")
    return null;
  }
};
Instance.prototype.unpack = function( s , trace ){
  var done = false;
  var backrefId = null;;
  var refId = null;
  var n;
  var key;
  var excludes = null;
  while( !done ){
    var m = re.exec(s);
    if ( m ){
      var len = m[0].length;
      n = null;
      backrefId = null;
      key = m[1].toUpperCase();

      if ( m[2] ){
        // backref
        refId = parseInt(m[2]);
        backrefId = key+"-"+refId;
        if ( this.backrefs[backrefId] ){ // exists - shortcut exit
          n = this.backrefs[backrefId];
        }else{
          excludes = [];
          for ( var index = 0 ; index< refId ; index++ ){
            if ( this.backrefs[key+"-"+index] ){
              excludes.push( this.backrefs[key+"-"+index] );
            }
          }
          if ( excludes.length == 0 ) excludes = null;
        }
      }
      if ( !n ){
        n = this.solve(key,trace,excludes);
      }
      if ( n ){
        if ( backrefId){ // remeber it
          this.backrefs[backrefId] = n;
        }
        n = matchFirstCase( m[1] , n );
        var pre = s.substring(0,m.index);
        var post = s.substring(m.index+len);
        s = pre+n+post;
      }else{
        // no n found - fail
        return null;
      }
    }else{
      done = true;
    }
  }
  return s;
};
Instance.prototype.toString = function(){
  if ( ! this.solved ){
    this.solved = this.solve( this.s , "" );
  }
  return this.solved;
}

function matchFirstCase( targetCase , source ){
  var firstUpper = isUpperCase( targetCase[0] );
  if ( firstUpper != isUpperCase(source[0]) ){
    var n;
    if ( firstUpper ){
      n = source[0].toUpperCase();
    }else{
      n = source[0].toLowerCase();
    }
    return n + source.substring(1);
  }else{
    return source;
  }
}

function isUpperCase(c){
  return c == c.toUpperCase();
}

module.exports = Generator;
