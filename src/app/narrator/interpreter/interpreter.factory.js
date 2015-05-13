'use strict';

/**
 * @ngdoc function
 * @name narrator.controller:InterpreterCtrl
 * @description
 * # InterpreterCtrl
 * Controller of the narrator
 */
angular.module('narrator')
  .factory('InterpreterCtrl', function () {
    factory = {};

    factory.interpreter = new Interpreter("");

 	factory.loadAst = function(ast){
 		this.interpreter.setAst(ast);
 	};

 	factory.debugStep = function(){
 		this.interpreter.step();
 		return this.interpreter.stateStack[0].node;
 	};

 	factory.narrativeStep = function(){
 		this.interpreter.step();
 		while(!this.interpreter.stateStack[0].node.item){
 			this.interpreter.step();
 		}
 		return this.interpreter.stateStack[0].node;
 	};

    return factory;        
  });
