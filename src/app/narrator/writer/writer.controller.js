'use strict';

/**
 * @ngdoc controller
 * @name narrator.controller:WriterCtrl
 * @requires cast.factory:CAST
 * @description
 * Controller of the writer state of the narrator. Allows for adding and removing
 * narratives as well as selecting and deselecting narratives for editing. 
 */

angular.module('narrator')
  .controller('WriterCtrl', [ '$scope', '$state', 'CAST', 
    function ($scope, $state, CAST) {

    // Add a narrative
    $scope.addNarrative = function(){
      var newNarrative;
      if($scope.activeNode.isASTNode()){
        newNarrative = new CodeNarrative('New Narrative', CAST.selectedPath);
      } else {
        newNarrative = new FSNarrative('New Narrative', CAST.selectedPath);
      }
      $scope.narratives.push(newNarrative);
      CAST.narratives[CAST.selectedPath] = CAST.narratives[CAST.selectedPath] || [];
      CAST.narratives[CAST.selectedPath].push(newNarrative);
    };

    // Remove a narrative
   	$scope.removeNarrative = function(narrative){
   		var i = $scope.narratives.indexOf(narrative);
   		$scope.narratives.splice(i,1);
   		$scope.deselectNarrative();
   	};

   	// Select a narrative to edit or view
    $scope.selectNarrative = function(narrative){
      $scope.selectedNarrative = narrative;
      $state.go('^.editing');
    };

    // Deselect the narrative being edited or viewed
    $scope.deselectNarrative = function(){
      $state.go('^.selecting');
    }


}]);
