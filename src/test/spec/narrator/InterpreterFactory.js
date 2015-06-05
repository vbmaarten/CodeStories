'use strict';

describe('Factory: Interpreter factory', function() {
  // ---- Initialization ----
  beforeEach(module('codeStoriesApp'));

  var interpreterFactory;
  var script = "var sum = 0;\
\
  for(var i = 0; i < 10; i++){\
  	sum += i;\
  }";

  var astNode = wrapAcornAsASTNode(acorn.parse(script), "/", new CASTNodeFactory.RootNode());


  beforeEach(inject(function (_interpreterFactory_){
    interpreterFactory = _interpreterFactory_;
  }));

  // ---- Tests -----
  it("should exist", function(){
  	expect(interpreterFactory).toBeDefined();
  });

  it("should be possible to give it a self-compiled AST", function(){
    var codeNarrative = new NarrativeFactory.CodeNarrative("codeNarrative", "/", [])
    interpreterFactory.setupNarratedAST(astNode, codeNarrative);

    expect(interpreterFactory.interpreter.ast.body[0].type).toEqual("VariableDeclaration");
  });

  it("should be possible to step through it like a debugger", function(){
    var codeNarrative = new NarrativeFactory.CodeNarrative("codeNarrative", "/", [])
    interpreterFactory.setupNarratedAST(astNode, codeNarrative);

    expect(interpreterFactory.interpreter.stateStack[0].node.type).toEqual("Program");
    interpreterFactory.debugStep();    
    expect(interpreterFactory.interpreter.stateStack[0].node.type).toEqual("VariableDeclaration");
  });

  it("should be possible to step to the next narrative", function(){
    var node = astNode.tnode.body[1];

    var codeNarrative = new NarrativeFactory.CodeNarrative("codeNarrative", "/", [{node: "body/1", items: [new TextItem("textitem")]}]);
    interpreterFactory.setupNarratedAST(astNode, codeNarrative);

    var step = interpreterFactory.narrativeStep();

    expect(step.node).toEqual(node.ASTNode);
  });


});
