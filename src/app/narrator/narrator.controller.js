'use strict';
/**
 * @ngdoc controller
 * @name narrator.controller:NarratorCtrl
 * @requires cast.factory:CAST
 * @requires narrator.factory:narratorFactory
 * @description
 * Controls the current state of the narrator; viewing or editing. As well as
 * obtaining the currently selected node and narrative. Also checks if there was
 * a narrative playing (Will be replaced by $state in the future).
 */
angular.module('narrator').controller('NarratorCtrl', [
  '$scope',
  '$state',
  'CAST',
  'narratorFactory',
  function ($scope, $state, CAST, narratorFactory) {

    // Get the current active node in the CAST and its narratives
    $scope.activeNode = CAST.selected || '/';
    $scope.narratives = CAST.getSelectedNarratives() || [];

    console.log($state.is('narrating.viewer.playing'));
    
    // If there was a narrative linked, continue that narrative
    if (narratorFactory.narrativeLink) {
      narratorFactory.narrativeLink = false;
      $scope.playing = true;
    } else {
      $scope.selected = false;
      $scope.selectedNarrative = {};
      $scope.playing = false;
    }
  }
]);