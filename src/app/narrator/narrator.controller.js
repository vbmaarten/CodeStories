'use strict';
/**
 * @ngdoc controller
 * @name narrator.controller:NarratorCtrl
 * @requires cast.factory:CAST
 * @description
 * Controls the current state of the narrator; viewing or editing. As well as
 * obtaining the currently selected node and narrative. Also checks if there was
 * a narrative playing (Will be replaced by $state in the future).
 */
angular.module('narrator').controller('NarratorCtrl', [
  '$scope',
  '$state',
  'CAST',
  function ($scope, $state, CAST) {

    // Get the current active node in the CAST and its narratives
    $scope.activeNode = CAST.selected || '/';
    $scope.narratives = CAST.getSelectedNarratives();
    $scope.related = CAST.getRelatedNarratives();

    $scope.$on('castEvent', function (event) {
      console.log('narrator castevent');
      $scope.related = CAST.getRelatedNarratives();
    	$scope.activeNode = CAST.selected || '/';
    	$scope.narratives = CAST.getSelectedNarratives();
    	
    });

    $scope.readableSubNode = function(path){
      
    	return CAST.getFileAndLine(path);
    }
  }
]);