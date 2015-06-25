'use strict';
/**
 * @ngdoc service
 * @name narrator.factory:interpreterFactory
 * @description
 *
 * Interpreter Factory, the service to interact with the javascript interpreter
 */
angular.module('narrator').factory('interpreterFactory', [
  'vCodeInterpreterFactory',
  'notificationsFactory',
  function (vCodeInterpreterFactory,notificationsFactory) {
    var interpreter;
    var narrativeName;
    var hookItems;
    var activeTnodes;
    var i = 0;




    function processVCodeItem(step){

         var item = step.item.clone();
         item.usedVariables = step.item.usedVariables;
        try {
          vCodeInterpreterFactory.runVCode(item, step.scope);
        } catch (error){
          notificationsFactory.error(error,"running: '" + item.content + "'");
        }
        step.item = item;
        return step;
    }

    function processCodeItem(step){
        var code = step.item.content;
        var ast = acorn.parse(code);
        try {
          interpreter.setAst(ast,interpreter.prevScope);
        } catch (error){
          notificationsFactory.error(error,"running: '" + code + "'");
        }
        return step;

    }

    function processTextItem(step){
       var item = step.item.clone();
        var doubleBrakRegex = /\[\[\s?([\w.]*)\s?\]\]/;
        // regex to match [[ someword.word ]] 
        var matched = doubleBrakRegex.exec(item.content);
        while (matched) {
          var value = getDescendantProp(step.scope , matched[1]) ;
          if(value === undefined){
            value = "undefined";
          }
          item.content = item.content.split(matched[0]).join(JSON.stringify(value));
          matched = doubleBrakRegex.exec(item.content);
        }
      
      step.item = item;

      return step;

    }

        function getDescendantProp(obj, desc) {
      var arr = desc.split(".");
      while(arr.length && (obj = obj[arr.shift()]));
        return obj;
    }
    /**
        * @ngdoc method
        * @name processCodeItems
        * @methodOf narrator.factory:viewerFactory
        * @description
        * Runs VCode items 
         Code items and Text items
        */
    function processItem(step) {
      var item = step.item;
      if(!item){

      } else if (item.isVCodeItem()) {
        step = processVCodeItem(step);

        
      } else if (item.isCodeItem()){
        step = processCodeItem(step);

      } else if (item.isTextItem()) { // Match text from a text time to be replaced by values of the current state of execution
        step = processTextItem(step);
      }
      return step;
    }
    function resetInterpreter() {
      interpreter = new Interpreter('');
      if(activeTnodes){
        for( var node in activeTnodes){
          delete activeTnodes[node].codeNarrative
        }
      }
      activeTnodes = undefined;
      narrativeName = '';
      hookItems = '';

      i = 0;
    }
    resetInterpreter();
    /**
         * @ngdoc method
         * @name setupNarratedASt
         * @methodOf narrator.factory:interpreterFactory
         * @description
         * load in an AST and it's narrative
         *
         * @param {ASTNode} ASTNode the ast node to which the narrative must be loaded
         * @param {CodeNarrative} codeNarrative The code narrative that has to be loaded with the ASTNode
         */
    function setupNarratedAST(node, codeNarrative) {
      activeTnodes = node.attachNarrativeHooks(codeNarrative);
      narrativeName = codeNarrative.name;
      i = 0;
      var keepScope = false;
      if( codeNarrative.dependencies ){
        var depCode = ''
        keepScope = true;
        for(var dep in codeNarrative.dependencies){
          depCode += codeNarrative.dependencies[dep].content
        }
        interpreter = new Interpreter(depCode);
        interpreter.run();
      } 
      interpreter.setAst(node.tnode , interpreter.globalScope);
      
      vCodeInterpreterFactory.newSession();
    }
    function getCurrentScope() {
      return interpreter.getCurrentScope();
    }
    /**
         * @ngdoc method
         * @name debugStep
         * @methodOf narrator.factory:interpreterFactory
         * @description
         * Steps one step through the code
         *
         * @return {tnode} The current node after the step is made
         */
    function debugStep() {
      return narrativeStep(true);
    }
    function checkCurrentHookForItems() {
      if (hookItems && hookItems[i + 1]) {
        i++;
        return {
          'node': processedNode.ASTNode,
          'item': hookItems[i],
          'scope': getCurrentScope()
        };
      }
      return false;
    }


    /**
         * @ngdoc method
         * @name narrativeStep
         * @methodOf narrator.factory:interpreterFactory
         * @description
         * Steps through the code, until the next narrative occurs
         *
         * @return { node: tnode item: Item } The node the interpreter stepped to, with it's item.
         */
    var processedNode;
    function narrativeStep(debugStep) {
      var currentStep = checkCurrentHookForItems();
      var step = true;
      var item = false;
      var oldStackSize, newStackSize;

      function hasProcessedAHook(){
        //when the processedNode has a current narrative and the stack size has decreased (node has been poped)
          return oldStackSize > newStackSize && 
                  processedNode.codeNarrative && 
                  processedNode.codeNarrative[narrativeName] ;
        }
      if (currentStep) {
        return processItem(currentStep);
      }

      try {
        do {
          if (interpreter.stateStack.length === 0) {
            return {
              'node': processedNode.ASTNode,
              'item': item
            };
          }
          processedNode = interpreter.getCurrentNode();
          oldStackSize = interpreter.stateStack.length;
         
          step = interpreter.step();
        
          newStackSize = interpreter.stateStack.length;
          if (debugStep && processedNode.ASTNode ) {// only break if the processedNode is part of the CAST
            break;
          }  
        } while ( !hasProcessedAHook() );

      } catch(error){
        notificationsFactory.error(error,processedNode);
      }

      hookItems = processedNode.codeNarrative ? processedNode.codeNarrative[narrativeName] : undefined;
      i = 0;
      if ( hasProcessedAHook() ) {
        item = hookItems[i];
      }
      return processItem({
        'node': processedNode.ASTNode,
        'item': item,
        'scope': getCurrentScope()
      });
    }
    return {
      reset: resetInterpreter,
      setupNarratedAST: setupNarratedAST,
      narrativeStep: narrativeStep,
      debugStep: debugStep,
      getCurrentScope: getCurrentScope
    };
  }
]);