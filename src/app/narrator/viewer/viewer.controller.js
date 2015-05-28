'use strict';

/**
 * @ngdoc controller
 * @name narrator.controller:ViewerCtrl
 * @requires narrator.factory:viewerFactory
 * @description
 * controls the narrator viewer. Allows for selecting and deselecting narratives 
 * for playback and advance a selected narrative. Displays the playing narrative.
 */

angular.module('narrator')
  .controller('ViewerCtrl', [ '$scope', 'viewerFactory',	function ($scope, viewerFactory) {

 	$scope.storyboard = viewerFactory.storyboard;

 	$scope.next =function (){

 		// Do one step in the narrative
 		viewerFactory.step();
 		// Check if the narrative is still playing after the last step

 	}

	// Select a narrative to edit or view
  $scope.selectNarrative = function(narrative){
    viewerFactory.selectNarrative(narrative);
  };

  // Deselect the narrative being edited or viewed
  $scope.deselectNarrative = function(){
    viewerFactory.deselectNarrative();
  }

}]);
