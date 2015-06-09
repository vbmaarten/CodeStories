'use strict';

describe('Factory: Interpreter factory', function() {
  // ---- Initialization ----
  beforeEach(module('codeStoriesApp'));

  var interpreterFactory;
  var NarrativeFactory;
  var CASTNodeFactory;
  var ItemFactory;
  var astNode ;
  var codeNarrative;

  beforeEach(inject(function (_interpreterFactory_,_NarrativeFactory_, _CASTNodeFactory_,_ItemFactory_){
      interpreterFactory = _interpreterFactory_;
      NarrativeFactory = _NarrativeFactory_;
      CASTNodeFactory = _CASTNodeFactory_;
      ItemFactory = _ItemFactory_;
      var aFileNode = new CASTNodeFactory.FileNode("test.js" , new CASTNodeFactory.RootNode() , {} , test_script1 );
      astNode = aFileNode.getChild('Program');
      codeNarrative = new NarrativeFactory.CodeNarrative("codeNarrative", "/test.js", [])

  }));

  

  // ---- Tests -----
  it("should exist", function(){
  	expect(interpreterFactory).toBeDefined();
  });


  it("should be possible to setup the interpreter with an ASTNode and do a debug step and then reset", function(){
    
    interpreterFactory.setupNarratedAST(astNode, codeNarrative);
    interpreterFactory.debugStep();
    var step = interpreterFactory.debugStep();

    expect( step.node.tnode.type ).toEqual("VariableDeclaration");

    interpreterFactory.reset();

    var step = interpreterFactory.debugStep();
    expect(step.node ).toEqual( undefined );
  });


  it("should be possible to step to the next narrative and a debug step should not step off a narrative node", function(){
    var node = astNode.tnode.body[1];
    var codeNarrative = new NarrativeFactory.CodeNarrative("codeNarrative", "/test.js", [{path: "/body/1", 
        items: [
          new ItemFactory.TextItem("textitem"),
          new ItemFactory.TextItem("textitem"),
          new ItemFactory.TextItem("textitem")
        ]}]);
    interpreterFactory.setupNarratedAST(astNode, codeNarrative);

    var step = interpreterFactory.narrativeStep();
    expect(step.node).toEqual(node.ASTNode);
    step = interpreterFactory.narrativeStep();
    expect(step.node).toEqual(node.ASTNode);
    step = interpreterFactory.debugStep();
    expect(step.node).toEqual(node.ASTNode);
    
  });

    it("should be possible to inject the value of a variable in the scope in a text item with [[ variable_name ]] ", function(){
    var node = astNode.tnode.body[1];
    var codeNarrative = new NarrativeFactory.CodeNarrative("codeNarrative", "/test.js", [{path: "/body/1/body/body/0/expression", 
        items: [
          new ItemFactory.TextItem("sum = [[ sum ]] and i = [[ i ]] ")
        ]}]);
    interpreterFactory.setupNarratedAST(astNode, codeNarrative);

    var step = interpreterFactory.narrativeStep();
    expect(step.item.content).toEqual("sum = 0 and i = 0 ");
    step = interpreterFactory.narrativeStep();
    expect(step.item.content).toEqual("sum = 1 and i = 1 ");
   
  });


});
