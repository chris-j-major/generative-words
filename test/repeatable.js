const assert = require('assert');
const core = require("generative-core");
const Words = require("../");


describe("Words(repeatable)", function() {

  var w = new Words();

  w.loadJSONModel( {
    "S":[
      "[CVC][CVC][CVC]"
    ],
    "CVC":[
      "[C][V][C]"
    ],
    "C":"BCDFGHJKLMNPQRSTVWXYZ".split(""),
    "V":"AEIOU".split("")
  } );

  describe('generate()', function() {
    it("Generates a string repeatably",function(done){
      var n = new core.Seeded(84329);
      var orig = w.generate({random:n}).toString();
      for ( var i = 0 ; i<50 ; i++ ){
        var m = new core.Seeded(84329);
        var latest = w.generate({random:m}).toString();
        assert.equal( orig , latest );
      }
      done();
    });

    it("Generates a string differently",function(done){
      var index = 5;
      var n = new core.Seeded(index);
      var orig = w.generate({random:n}).toString();
      for ( var i = 0 ; i<50 ; i++ ){
        var m = new core.Seeded(++index);
        var latest = w.generate({random:m}).toString();
        assert.notEqual( orig , latest );
      }
      done();
    });
  });
});
