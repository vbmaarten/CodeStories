'use strict';

describe('Factory: Interpreter factory', function() {
  beforeEach(module('codeStoriesApp'));
  beforeEach(module("narrator"));

  var projectLoaderFactory;
  var script = "var sum = 0;\
\
  for(var i = 0; i < 10; i++){\
  	sum += i;\
  }";

  var astNode = new ASTNode("program", null, {}, acorn.parse(script));

  

  beforeEach(inject(function (_interpreterFactory_){
    projectLoaderFactory = _interpreterFactory_;
  }));

  tests();
});

function tests(){
  it("should", function(){
  	expect(true).toBe(true);
  });
}