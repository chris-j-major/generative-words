const assert = require('assert');
const core = require("generative-core");
const Words = require("../");


describe("Words(skip-missing)", function() {

  var w = new Words();

  w.loadJSONModel( {
    "S":[
      "[L][L] [NONE]",
      "[L][L] [N]",
      "[L][L] [N]",
      "[L][L] [N]",
      "[L][L] [NONE]",
      "[L][L] [NONE]",
      "[L][L] [L]",
    ],
    "NONE":[],
    "L":[
      "A","B","C","D","E","F","G"
    ],
    "N":[
      "[L][L] [NONE]",
      "[L][L] [NONE]",
      "[L][L] [NONE]",
      "[L][L] [NONE]"
    ],
  } );

  describe('generate()', function() {
    it("Generates a string sucsesfully (skipping missing options)",function(done){
      var r = new core.Reporter();
      var n = new core.Seeded(84329);
      assert.ok( w.generate({reporter:r,random:n}).toString().match(/^[A-Z][A-Z] [A-Z]$/) );
      assert.ok( r.stats().warnings > 0 );
      done();
    })
  });
});
