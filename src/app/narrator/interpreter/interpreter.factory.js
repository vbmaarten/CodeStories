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

    this.currentNarrative;

	 	factory.loadAst = function(ast,narrativeName){
	 		this.currentNarrative = narrativeName;
	 		this.interpreter.setAst(ast);
	 	};

	 	factory.debugStep = function(){
	 		this.interpreter.step();
	 		return this.interpreter.stateStack[0].node;
	 	};

	 	var currentASTItems;
	 	var i = 0;
	 	factory.narrativeStep = function(){
 		
	 		if(currentASTItems[i++]){
	 			return currentASTItems[i];
	 		}
	 		while(!this.interpreter.stateStack[0].node.codeNarrative[ this.currentNarrative ] ){
	 			if( !this.interpreter.step() ){
	 				return false;
	 			}
	 		}
	 		currentASTItems = this.interpreter.stateStack[0].codeNarrative;
	 		i=0;
	 		return currentASTItems[i];
	 	};

    return factory;        
  });
