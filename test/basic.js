const assert = require('assert');
const core = require("generative-core");
const Words = require("../");


describe("Words(basic)", function() {

  var w = new Words();

  w.loadJSONModel( {
    "S":[
      "abba [L1] [L2] [L2] [L1] - [NESTED]",
      "abcba [L1] [L2] [L3] [L2] [L1] - [NESTED]",
      "abccba [L1] [L2] [L3] [L3] [L2] [L1] - [NESTED]"
    ],
    "L":[
      "A","B","C","D","E","F","G"
    ],
    "NESTED":[
      "(nested [L1] [L1])"
    ]
  } );

  describe('generate()', function() {
    it("Generates a string",function(done){
      assert.ok( w.generate().toString().length > 0 );
      done();
    })
  });
});
