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

	 	factory.setupNarratedAST = function(ASTNode,narrative){

	 		var items = narrative.ASTItems
	 		var node;

	 		for(var i in items){
	 			var node = ASTNode.getNode(i)
	 			node.ast.codeNarrative = node.ast.codeNarrative || {};
	 			node.ast.codeNarrative[narrative.name] = [];
	 			for(var j in items[i].items)
	 				node.ast.codeNarrative[narrative.name].push(Item.prototype.buildNewItem(items[i].items[j]));
	 		}


	 		currentNarrative = narrative.name;
	 		i=0;
	 		this.interpreter.setAst(ASTNode.ast);
	 	};

	 	factory.debugStep = function(){
	 		this.interpreter.step();
	 		return this.interpreter.stateStack[0].node;
	 	};

	 	
	 	factory.narrativeStep = function(){
 		
	 		if(currentASTItems[i++]){
	 			return currentASTItems[i];
	 		}
<<<<<<< HEAD
	 		while(!this.interpreter.stateStack[0].node.codeNarrative[ this.currentNarrative ] ){
	 			if( !this.interpreter.step() ){
	 				return false;
	 			}
	 		}
	 		currentASTItems = this.interpreter.stateStack[0].codeNarrative;
=======
	 		var step = true;
	 		while(!this.interpreter.stateStack[0].node.codeNarrative[ currentNarrative ] ){
	 			step = this.interpreter.step()
	 			if( !step ){
	 				return false;
	 			}
	 		}
	 		currentASTItems = this.interpreter.stateStack[0].node.codeNarrative[currentNarrative];
>>>>>>> 10405a3654510cc2bfb6f4ef54a16066ad8b6271
	 		i=0;
	 		return currentASTItems[i];
	 	};

    return factory;        
  });
