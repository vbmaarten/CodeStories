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
 {"text":"<p> somet text </p>"},
 {"text":"<p> more text </p>"},
 ]}

 var nar2 = 
 {'path':"/someotherfile.js/",
 'primitives':[
 {"text":"<p> this is about otherfile.js</p>"},
 {"text":"<p> and so is this </p>"}
 ]}
 nar1.primitives.push({'link':nar2});


 angular.module('narrator',["xeditable"])
 .controller('NarratorCtrl', function ($scope) {

 	$scope.writerMode = true	;

 	$scope.storyBoard = []
 	$scope.activeNarrative = {'path':'/','primitives':[{'link':nar1}]};
 	$scope.primitiveIndex = 0
 	
 	$scope.next =function (){
 		
 		var step = $scope.activeNarrative.primitives[$scope.primitiveIndex];
 		if(step.link){
 			$scope.storyBoard.push( 
 				{'path':step.link.path ,'primitives':[]}
 				)
 			$scope.activeNarrative = step.link
 			$scope.primitiveIndex=0;
 		}
 		else {
 			console.log($scope)
 			$scope.storyBoard[$scope.storyBoard.length-1].primitives.push(
 				$scope.activeNarrative.primitives[$scope.primitiveIndex]
 				)
 			$scope.primitiveIndex++;
 		}
 	}

    $scope.addNarrative = function(storyBoard,index){
 		index = index ;
 		storyBoard.splice(index+1,0,{"path":"/todo/",'primitives':[]});
 	};
 	$scope.removeNarrative = function(storyBoard,index){
 		storyBoard.splice(index,1);

 	};

 	



 });
