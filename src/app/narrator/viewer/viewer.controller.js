'use strict';

/**
 * @ngdoc controller
 * @name narrator.controller:ViewerCtrl
 * @requires narrator.factory:narratorFactory
 * @description
 * controls the narrator viewer. Allows for selecting and deselecting narratives 
 * for playback and advance a selected narrative. Displays the playing narrative.
 */

angular.module('narrator')
  .controller('ViewerCtrl', [ '$scope', 'narratorFactory',	function ($scope, narratorFactory) {

 	$scope.storyboard = narratorFactory.storyboard;

 	$scope.next =function (){

 		// Do one step in the narrative
 		narratorFactory.step();
 		// Check if the narrative is still playing after the last step
 		$scope.playing = narratorFactory.narrativePlaying;
 		
 		if(!$scope.playing){
 			$scope.deselectNarrative();
 		}

 	}

	// Select a narrative to edit or view
  $scope.selectNarrative = function(narrative){
    $scope.selected = true;
    $scope.selectedNarrative = narrative;
    $scope.playing = true;
    narratorFactory.selectNarrative(narrative);
  };

  // Deselect the narrative being edited or viewed
  $scope.deselectNarrative = function(){
    $scope.selected = false;
    $scope.playing = false;
    narratorFactory.deselectNarrative();
  }

}]);
