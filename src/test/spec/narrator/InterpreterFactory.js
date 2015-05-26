'use strict';

describe('Factory: Interpreter factory', function() {
  // ---- Initialization ----
  beforeEach(module('codeStoriesApp'));
  beforeEach(module("narrator"));

  var interpreterFactory;
  var script = "var sum = 0;\
\
  for(var i = 0; i < 10; i++){\
  	sum += i;\
  }";

  //var astNode = new ASTNode("/", null, {}, acorn.parse(script));
  var astNode = wrapAcornAsASTNode(acorn.parse(script), "/", null);


  beforeEach(inject(function (_interpreterFactory_){
    interpreterFactory = _interpreterFactory_;
  }));

  // ---- Tests -----
  it("should exist", function(){
  	expect(interpreterFactory).toBeDefined();
  });

  it("should be possible to give it a self-compiled AST", function(){
    var codeNarrative = new CodeNarrative("codeNarrative", "/", [])
    interpreterFactory.setupNarratedAST(astNode, codeNarrative);

    expect(interpreterFactory.interpreter.ast.body[0].type).toEqual("VariableDeclaration");
  });

  it("should be possible to step through it like a debugger", function(){
    var codeNarrative = new CodeNarrative("codeNarrative", "/", [])
    interpreterFactory.setupNarratedAST(astNode, codeNarrative);

    expect(interpreterFactory.interpreter.stateStack[0].node.type).toEqual("Program");
    interpreterFactory.debugStep();    
    expect(interpreterFactory.interpreter.stateStack[0].node.type).toEqual("VariableDeclaration");
  });

  it("should be possible to step to the next narrative", function(){
    var node = astNode.tnode.body[1];

    var codeNarrative = new CodeNarrative("codeNarrative", "/", [{node: "body/0", items: [new TextItem("textitem")]}]);
    console.log(codeNarrative);
    interpreterFactory.setupNarratedAST(astNode, codeNarrative);

    //interpreterFactory.narrativeStep();

    expect(interpreterFactory.interpreter.stateStack[0]).toEqual(node);
  });


});
