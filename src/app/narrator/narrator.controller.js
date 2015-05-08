'use strict';

/**
 * @ngdoc function
 * @name narrator.controller:NarratorCtrl
 * @description
 * # NarratorCtrl
 * Controller of the narrator
 */




 angular.module('narrator',[])
 .controller('NarratorCtrl', [ "$scope" , "CAST" ,function ($scope , CAST) {

 	$scope.writerMode = false	;

 	$scope.storyBoard = [[]]
 	$scope.activeNarrative = CAST.getNode("/").narratives["teststory"]; //[{'link-choice':CAST.cast['/']['narratives/']}]
 	$scope.activeNarrativePath = "/"; 
 	$scope.primitiveIndex = 0
 	
 	$scope.next =function (){
 		
 		var step = $scope.activeNarrative[$scope.primitiveIndex];
 		$scope.storyBoard[$scope.storyBoard.length-1].push(
 			$scope.activeNarrative[$scope.primitiveIndex]
 			)
 		$scope.primitiveIndex++;
 		if(step.type === 'link'){
 			$scope.storyBoard.push( [] )
 			$scope.activeNarrative = CAST.getNode( step.content.node ).narratives[step.content.id];
 			$scope.primitiveIndex=0;
 		}
 		
 	}

 	$scope.addNarrative = function(storyBoard,afterNarrative){
 		var i = storyBoard.indexOf(afterNarrative);
 		storyBoard.splice(index+1,0,[]);
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
