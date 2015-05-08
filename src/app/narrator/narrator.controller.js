'use strict';

/**
 * @ngdoc function
 * @name narrator.controller:NarratorCtrl
 * @description
 * # NarratorCtrl
 * Controller of the narrator
 */

 var nar1 =
 {'path':'/something/',
 'primitives':[

 {'type':'text','content':'somet text  '},
 {'type':'text','content':' more text  '}
 ]};

 var nar2 = 
 {'path':'/someotherfile.js/',
 'primitives':[
 {'type':'text','content':' text about some other file text  '},
 {'type':'text','content':'MOAR '}
 ]};
 nar1.primitives.push({'type':'link','content':nar2});


 angular.module('narrator',[])
 .controller('NarratorCtrl', [ "$scope" , "CAST" ,function ($scope , CAST) {

 	$scope.writerMode = false	;

 	CAST.cast['app/'] = {};

 	$scope.storyBoard = [{'path':'/','primitives':[]}]
 	$scope.activeNarrative = {'path':'/','primitives':[{'type':'link','content':nar1}]};
 	$scope.primitiveIndex = 0
 	
 	$scope.next =function (){
 		
 		var step = $scope.activeNarrative.primitives[$scope.primitiveIndex];
 		console.log(step);

 		$scope.storyBoard[$scope.storyBoard.length-1].primitives.push(
 			$scope.activeNarrative.primitives[$scope.primitiveIndex]
 			)
 		$scope.primitiveIndex++;
 		if(step.type === 'link'){
 			$scope.storyBoard.push( 
 				{'path':step.content.path ,'primitives':[]}
 				)
 			$scope.activeNarrative = step.content
 			$scope.primitiveIndex=0;
 		}
 		
 	}

 	$scope.addNarrative = function(storyBoard,afterNarrative){
 		var i = storyBoard.indexOf(afterNarrative);
 		storyBoard.splice(index+1,0,{'path':'/todo/','primitives':[]});
 	};
 	$scope.removeNarrative = function(storyBoard,narrative){
 		var i = storyBoard.indexOf(narrative);
 		storyBoard.splice(i,1);

 	};

 	



 }]).directive('narrative', function () {
 	return {
 		templateUrl:'narrator/narrative/narrative.html',
 	}
 }).directive('addNarrativeBtn',function(){
 	return {
 		template:  "<div ng-show='writerMode' class='narrator-btn' ng-click='addNarrative(storyBoard,narrative);'>+</div>",	
 	}
 }).directive('removeNarrativeBtn',function(){
 	return {
 		template:  "<div ng-show='writerMode' class='narrator-btn' ng-click='removeNarrative(storyBoard,narrative);'>-</div>",	
 	}
 });
