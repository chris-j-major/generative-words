const assert = require('assert');
const core = require("generative-core");
const Words = require("../");


describe("Words(custom)", function() {

  var w = new Words();

  w.loadJSONModel( {
    "S":[
      "[DAY] is [NOW]",
      "[NOW] is [DAY]"
    ]
  } );

  w.extendModel( 'NOW' , function(){
    return new Date().toString();
  });
  w.extendModel( 'DAY' , function(){
    return ["MONDAY","TUESDAY"];
  });

  describe('generate()', function() {
    it("Generates a string",function(done){
      assert.ok( w.generate().toString().length > 0 );
      done();
    })
  });
});
