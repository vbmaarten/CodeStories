'use strict';

/**
 * @ngdoc function
 * @name narrator.controller:NarratorCtrl
 * @description
 * # NarratorCtrl
 * Controller of the narrator
 */

angular.module('narrator')
  .controller('NarratorCtrl', [ '$scope', '$stateParams', '$state', 'CAST', 'narratorFactory', 
  	function ($scope, $stateParams, $state, CAST, narratorFactory) {

 	// State of the narrator, contains a list of the active narratives
 	$scope.narratorState = narratorFactory.narratorState;

 	// Get the current active node in the CAST
 	if($stateParams.path)
    $scope.activeNode = CAST.getNode($stateParams.path);
  else
   	$scope.activeNode = CAST.getNode('/');

  // If the user is able to edit the narratives or not (boolean)
 	$scope.writerMode = narratorFactory.writerMode;

 	// Navigate to corresponding state
  if(narratorFactory.writerMode)
  	$state.go('writer');
  else
  	$state.go('viewer');

  // Function to switch between states
  $scope.switchMode = function(){
  	if(narratorFactory.writerMode){
  		narratorFactory.writerMode = false;
  		$scope.writerMode = narratorFactory.writerMode;
	  	$state.go('viewer');
  	}
	  else{
	  	narratorFactory.writerMode = true;
  		$scope.writerMode = narratorFactory.writerMode;
	  	$state.go('writer');
	  }
  }

 	//$scope.activeNarrative = $scope.activeNode.narratives["teststory"]; //[{'link-choice':CAST.cast['/']['narratives/']}]

}]);
