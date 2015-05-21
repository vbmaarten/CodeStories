'use strict';

/**
 * @ngdoc function
 * @name narrator.controller:WriterCtrl
 * @description
 * # WriterCtrl
 * Controller of the writer state of the narrator
 */

angular.module('narrator')
  .controller('WriterCtrl', [ '$scope', 'CAST',	'narratorFactory', function ($scope, CAST, narratorFactory) {

    // Add a narrative
    $scope.addNarrative = function(){
      var newNarrative  ;
      if($scope.activeNode.isASTNode()){
        newNarrative = new CodeNarrative('New Narrative', CAST.selectedPath);
      } else {
        newNarrative = new FSNarrative('New Narrative', CAST.selectedPath);
      }
      $scope.narratives.push(newNarrative);
    };

    // Remove a narrative
   	$scope.removeNarrative = function(narrative){
   		var i = $scope.narratives.indexOf(narrative);
   		$scope.narratives.splice(i,1);
   		$scope.deselectNarrative();
   	};

   	// Select a narrative to edit or view
    $scope.selectNarrative = function(narrative){
      $scope.selected = true;
      $scope.selectedNarrative = narrative;
      $scope.playing = true;
      narratorFactory.selectNarrative(narrative);
      console.log('playing ' + $scope.playing);
    };

    // Deselect the narrative being edited or viewed
    $scope.deselectNarrative = function(){
      $scope.selected = false;
      $scope.playing = false;
      narratorFactory.deselectNarrative();
    }


}]);
