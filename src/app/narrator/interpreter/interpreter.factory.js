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
  function (vCodeInterpreterFactory) {
    var interpreter;
    var currentNarrative;
    var currentnarrativeHooks;
    var i = 0;
    /**
        * @ngdoc method
        * @name processItem
        * @methodOf narrator.factory:viewerFactory
        * @description
        * Runs VCode items in the VCode interpreter and replaces [[ variable_name ]] with the variable_name.toString from the interpreter scope
        */
    function processCodeStep(step) {
      var item = step.item;
      if(!item){

      } else if (item.isVCodeItem()) {
        item = item.clone();
        vCodeInterpreterFactory.runVCode(item, step.scope);
      } else if (item.isTextItem()) { // Match text from a text time to be replaced by values of the current state of execution
        item = item.clone();
        var doubleBrakRegex = /\[\[\s?(\w*)\s?\]\]/;
        // regex to match [[ someword ]]
        var matched = doubleBrakRegex.exec(item.content);
        while (matched) {
          var value = step.scope[matched[1]];
          if(value === undefined){
            value = "undefined";
          }
          item.content = item.content.split(matched[0]).join(value);
          matched = doubleBrakRegex.exec(item.content);
        }
      }
      step.item = item;
      return step;
    }
    function resetInterpreter() {
      interpreter = new Interpreter('');
      currentNarrative = '';
      currentnarrativeHooks = '';
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
    function setupNarratedAST(ASTNode, codeNarrative) {
      ASTNode.attachNarrativeHooks(codeNarrative);
      currentNarrative = codeNarrative.name;
      i = 0;
      interpreter.setAst(ASTNode.tnode);
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
      if (currentnarrativeHooks && currentnarrativeHooks[i + 1]) {
        i++;
        return {
          'node': processedNode.ASTNode,
          'item': currentnarrativeHooks[i],
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
      if (currentStep) {
        return processCodeStep(currentStep);
      }
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
        if (debugStep) {
          break;
        }  //stop when the processedNode has a current narrative and the stack size has decreased (node has been poped)
      } while (oldStackSize < newStackSize || !(processedNode.codeNarrative && processedNode.codeNarrative[currentNarrative]));
      currentnarrativeHooks = processedNode.codeNarrative ? processedNode.codeNarrative[currentNarrative] : undefined;
      i = 0;
      if (currentnarrativeHooks && currentnarrativeHooks[i]) {
        item = currentnarrativeHooks[i];
      }
      return processCodeStep({
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