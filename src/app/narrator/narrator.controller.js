'use strict';

/**
 * @ngdoc function
 * @name narrator.controller:NarratorCtrl
 * @description
 * # NarratorCtrl
 * Controller of the narrator
 */

 var nar1 =
 {'path':"/something/",
 'primitives':[
 {"text":"somet text  "},
 {"text":" more text  "},
 ]}

 var nar2 = 
 {'path':"/someotherfile.js/",
 'primitives':[
 {"text":"  this is about otherfile.js "},
 {"text":"  and so is this  "}
 ]}
 nar1.primitives.push({'link':nar2});


 angular.module('narrator',[])
 .controller('NarratorCtrl', function ($scope) {

 	$scope.writerMode = false	;

 	$scope.storyBoard = [{'path':'/','primitives':[]}]
 	$scope.activeNarrative = {'path':'/','primitives':[{'link':nar1}]};
 	$scope.primitiveIndex = 0
 	
 	$scope.next =function (){
 		
 		var step = $scope.activeNarrative.primitives[$scope.primitiveIndex];


			$scope.storyBoard[$scope.storyBoard.length-1].primitives.push(
				$scope.activeNarrative.primitives[$scope.primitiveIndex]
				)
			$scope.primitiveIndex++;
		if(step.link){
 			$scope.storyBoard.push( 
 				{'path':step.link.path ,'primitives':[]}
 				)
 			$scope.activeNarrative = step.link
 			$scope.primitiveIndex=0;
 		}
 		
 	}

    $scope.addNarrative = function(storyBoard,afterNarrative){
 		var i = storyBoard.indexOf(afterNarrative);
 		storyBoard.splice(index+1,0,{"path":"/todo/",'primitives':[]});
 	};
 	$scope.removeNarrative = function(storyBoard,narrative){
 		var i = storyBoard.indexOf(narrative);
 		storyBoard.splice(i,1);

 	};

 	



 }).directive('narrative', function () {
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
