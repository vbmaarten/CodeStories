'use strict';

describe('Factory: VCodeInterpreter factory', function() {
  // ---- Initialization ----
  beforeEach(module('codeStoriesApp'));

  var vCodeInterpreterFactory, interpreterFactory;

  beforeEach(inject(function (_vCodeInterpreterFactory_,_interpreterFactory_,_NarrativeFactory_, _CASTNodeFactory_,_ItemFactory_){
      vCodeInterpreterFactory = _vCodeInterpreterFactory_;
      interpreterFactory = _interpreterFactory_;

      var NarrativeFactory = _NarrativeFactory_;
      var CASTNodeFactory = _CASTNodeFactory_;
      var ItemFactory = _ItemFactory_;

      var aFileNode = new CASTNodeFactory.FileNode("test.js" , new CASTNodeFactory.RootNode() , {} , test_script1 );
      var astNode = aFileNode.getChild('Program');

      var codeNarrative = new NarrativeFactory.CodeNarrative("codeNarrative", "/test.js", [{path: "body/1", 
        items: [
          new ItemFactory.VCodeItem("var listObject = new List([]); display(listObject.domEl);")
         ]}]);

      interpreterFactory.setupNarratedAST(astNode, codeNarrative);


  }));

  

  // ---- Tests -----
  it("should exist", function(){
  	expect(vCodeInterpreterFactory).toBeDefined();
  });


  it("should be able to start and reset a session", function(){
    vCodeInterpreterFactory.newSession();

     vCodeInterpreterFactory.newSession();
    
  });

    it("should be possible to process a vCode Item" , function(){
       vCodeInterpreterFactory.newSession();

       var step = interpreterFactory.narrativeStep();
       vCodeInterpreterFactory.runVCode(step.item, step.scope);

       expect(step.item.dom).toBeDefined();

       vCodeInterpreterFactory.runVCode(step.item, step.scope);
       expect(step.item.dom).toBeDefined();

     
    
  });





});
