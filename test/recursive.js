const assert = require('assert');
const core = require("generative-core");
const Words = require("../");


describe("Words(recursive)", function() {

  var w = new Words();

  w.loadJSONModel( {
    "S":[
      "[Base-[A]]"
    ],
    "A":[
      "A","B","C"
    ],
    "BASE-A":[
      "Ardvark"
    ],
    "BASE-B":[
      "Bear"
    ],
    "BASE-C":[
      "Cheater"
    ]
  } );

  describe('generate()', function() {
    it("Generates a string sucsesfully",function(done){
      assert.ok( w.generate().toString().match(/^[A-Z][a-z]+$/) );
      done();
    })
  });
});
