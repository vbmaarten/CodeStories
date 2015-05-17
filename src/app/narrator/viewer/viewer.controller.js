'use strict';

/**
 * @ngdoc function
 * @name narrator.controller:ViewerCtrl
 * @description
 * # ViewerCtrl
 * Controller of the viewer state of the narrator
 */

angular.module('narrator')
  .controller('ViewerCtrl', [ '$scope',	function ($scope) {


 	$scope.itemIndex = 0;
 	

 	$scope.next =function (){
 		var step = $scope.activeNarrative[$scope.itemIndex];
 		$scope.storyBoard[$scope.storyBoard.length-1].push(
 			$scope.activeNarrative[$scope.itemIndex]
 			)
 		$scope.itemIndex++;
 		if(step.type === 'link'){
 			$scope.storyBoard.push( [] )
 			$scope.activeNarrative = CAST.getNode( step.content.node ).narratives[step.content.id];
 			$scope.itemIndex=0;
 		} 		
 	}

}]);
