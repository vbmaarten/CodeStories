'use strict';

describe('Factory: VCodeInterpreter factory', function() {
  // ---- Initialization ----
  beforeEach(module('codeStoriesApp'));

  var vCodeInterpreterFactory, interpreterFactory;

  beforeEach(inject(function (vCodeInterpreterFactory,_interpreterFactory_){
      vCodeInterpreterFactory = _vCodeInterpreterFactory_;
      interpreterFactory = _interpreterFactory_;

      var aFileNode = new CASTNodeFactory.FileNode("test.js" , new CASTNodeFactory.RootNode() , {} , test_script1 );
      var astNode = aFileNode.getChild('Program');

      var codeNarrative = new NarrativeFactory.CodeNarrative("codeNarrative", "/test.js", [{path: "body/1", 
        items: [
          new ItemFactory.VCodeItem("var x = new VObject.List")
         ]}]);

      interpreterFactory.setupNarratedAST(astNode, codeNarrative);


  }));

  

  // ---- Tests -----
  it("should exist", function(){
  	expect(vCodeInterpreterFactory).toBeDefined();
  });


  it("should be able to start and reset a session", function(){
    vCodeInterpreterFactory.startSession();
    vCodeInterpreterFactory.resetSession();
    
  });

    it("should be possible to process a vCode Item" , function(){
       vCodeInterpreterFactory.startSession();

       var step = interpreterFactory.narrativeStep();
       vCodeInterpreterFactory.runVCode(step.item, step.scope);

       expect(step.item.domEl).toBeDefined();

       vCodeInterpreterFactory.runVCode(step.item, step.scope);
       expect(step.item.domEl).toBeDefined();
    
  });

    it("should be possible to process a special text Item" , function(){
       console.log(todo);
    
  });





});
