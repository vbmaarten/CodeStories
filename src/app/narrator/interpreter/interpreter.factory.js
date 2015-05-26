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
    var factory = {};

    factory.interpreter = new Interpreter("");

		var currentNarrative;
		var currentitemHooks;
	 	var i = 0;
	 	
	 	
        /**
         * @ngdoc method
         * @name setupNarratedASt
         * @methodOf interpreter.factory:interpreterFactory
         * @description
         * load in an AST and it's narrative
         *
         * @param {ASTNode} ASTNode the ast node to which the narrative must be loaded
         * @param {CodeNarrative} codeNarrative The code narrative that has to be loaded with the ASTNode
         */
	 	factory.setupNarratedAST = function(ASTNode,codeNarrative){
	 		ASTNode.attachItemHooks(codeNarrative);

	 		currentNarrative = codeNarrative.name;
	 		i=0;
	 		this.interpreter.setAst(ASTNode.tnode);
	 	};

	 	/**
         * @ngdoc method
         * @name debugStep
         * @methodOf interpreter.factory:interpreterFactory
         * @description
         * Steps one step through the code
         *
         * @return {tnode} The current node after the step is made
         */
	 	factory.debugStep = function(){
	 		this.interpreter.step();
	 		return this.interpreter.stateStack[0].node;
	 	};

	 	factory.evaluateVCode = function(vcode){
	 	};

	 	/**
         * @ngdoc method
         * @name narrativeStep
         * @methodOf interpreter.factory:interpreterFactory
         * @description
         * Steps through the code, until the next narrative occurs
         *
         * @return {{node: tnode item: Item} object} The node the interpreter stepped to, with it's item.
         */
	 	var processedNode;
	 	factory.narrativeStep = function(){ 		
	 		if(currentitemHooks && currentitemHooks[i+1]){
	 			i++;
	 			return {'node':processedNode.ASTNode,'item':currentitemHooks[i]};
	 		}
	 		var step = true;
	 		
	 		
	 		do{
	 			processedNode = this.interpreter.stateStack[0].node;
	 			var oldStackSize = this.interpreter.stateStack.length;
	 			step = this.interpreter.step()
	 			var newStackSize = this.interpreter.stateStack.length;
	 			if( !step ){
	 				return {'node':processedNode.ASTNode,'item':false};
	 			}
	 			//stop when the processedNode has a current narrative and the stack size has decreased (node has been poped)
	 		} while(  ( oldStackSize < newStackSize ) || !(processedNode.codeNarrative && processedNode.codeNarrative[ currentNarrative ]) );
	 		currentitemHooks = processedNode.codeNarrative[currentNarrative];
	 		i=0;
	 		return {'node':processedNode.ASTNode,'item':currentitemHooks[i]};
	 	};

    return factory;        
  });
