'use strict';
/**
 * @ngdoc service
 * @name narrator.factory:interpreterFactory
 * @description
 *
 * Interpreter Factory, the service to interact with the javascript interpreter
 */ 
angular.module('narrator')
  .factory('interpreterFactory', function () {

    	var interpreter;
		var currentNarrative;
		var currentitemHooks;
	 	var i = 0;


    	function resetInterpreter(){
    		interpreter = new Interpreter("");
			currentNarrative = '';
			currentitemHooks = '';
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
	 	function setupNarratedAST(ASTNode,codeNarrative){
	 		ASTNode.attachItemHooks(codeNarrative);

	 		currentNarrative = codeNarrative.name;
	 		i=0;
	 		interpreter.setAst(ASTNode.tnode);
	 	};

	 	function getCurrentScope(){
	 		return interpreter.getCurrentScope();

	 	};

	 	/**
         * @ngdoc method
         * @name debugStep
         * @methodOf narrator.factory:interpreterFactory
         * @description
         * Steps one step through the code
         *
         * @return {tnode} The current node after the step is made
         */
	 	function debugStep (){
	 		interpreter.step();
	 		return interpreter.stateStack[0].node;
	 	};


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
	 	function narrativeStep(){ 		
	 		if(currentitemHooks && currentitemHooks[i+1]){
	 			i++;
	 			return {'node':processedNode.ASTNode,'item':currentitemHooks[i]};
	 		}
	 		var step = true;
	 		
	 		
	 		do{
	 			if(interpreter.stateStack.length === 0){
	 				return {'node':processedNode.ASTNode,'item':false};
	 			}
	 			processedNode = interpreter.stateStack[0].node;
	 			var oldStackSize = interpreter.stateStack.length;
	 			step = interpreter.step()
	 			var newStackSize = interpreter.stateStack.length;
	 			
	 			//stop when the processedNode has a current narrative and the stack size has decreased (node has been poped)
	 		} while(  ( oldStackSize < newStackSize ) || !(processedNode.codeNarrative && processedNode.codeNarrative[ currentNarrative ]) );
	 		currentitemHooks = processedNode.codeNarrative[currentNarrative];
	 		i=0;
	 		return {'node':processedNode.ASTNode,'item':currentitemHooks[i]};
	 	};

    return {
    	reset:resetInterpreter,
    	setupNarratedAST:setupNarratedAST,
    	narrativeStep:narrativeStep,
    	debugStep : debugStep,
    	getCurrentScope : getCurrentScope


    };        
  });
