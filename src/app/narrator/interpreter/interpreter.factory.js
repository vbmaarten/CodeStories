'use strict';

/**
 * @ngdoc function
 * @name narrator.controller:InterpreterCtrl
 * @description
 * # InterpreterCtrl
 * Controller of the narrator
 */
angular.module('narrator')
  .factory('interpreterFactory', function () {
    var factory = {};

    factory.interpreter = new Interpreter("");

    	var currentNarrative;
    	var currentASTItems;
	 	var i = 0;

	 	
	 	factory.setupNarratedAST = function(ASTNode,codeNarrative){


	 		
	 		ASTNode.attachItemsToAcornAST(codeNarrative);

	 		currentNarrative = narrative.name;
	 		i=0;
	 		this.interpreter.setAst(ASTNode.tnode);
	 	};


	 	factory.debugStep = function(){
	 		this.interpreter.step();
	 		return this.interpreter.stateStack[0].node;
	 	};

	 	factory.evaluateVCode = function(vcode){


	 	};


	 	var processedNode;
	 	factory.narrativeStep = function(){
 		
	 		if(currentASTItems && currentASTItems[i+1]){
	 			i++;
	 			return {'node':processedNode.ASTNode,'item':currentASTItems[i]};
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
	 		currentASTItems = processedNode.codeNarrative[currentNarrative];
	 		i=0;
	 		return {'node':processedNode.ASTNode,'item':currentASTItems[i]};
	 	};

    return factory;        
  });
