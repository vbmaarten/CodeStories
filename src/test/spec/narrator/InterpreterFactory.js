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

  var NarrativeFactory;
  var CASTNodeFactory;


    beforeEach(inject(function (_interpreterFactory_,_NarrativeFactory_,_CASTNodeFactory_){
      interpreterFactory = _interpreterFactory_;
   NarrativeFactory = _NarrativeFactory_
   CASTNodeFactory = _CASTNodeFactory_;
  }));

  var astNode = new CASTNodeFactory.FileNode("/" , new CASTNodeFactory.RootNode() , {} , script).getChild('Program');

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
