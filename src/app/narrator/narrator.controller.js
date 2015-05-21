'use strict';
/**
 * @ngdoc function
 * @name narrator.controller:NarratorCtrl
 * @description
 * # NarratorCtrl
 * Controller of the narrator
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

    
    // If the user is able to edit the narratives or not (boolean)
    $scope.writerMode = narratorFactory.writerMode;
    // Navigate to corresponding state
    if (narratorFactory.writerMode) {
      $state.go('narrating.node.writer');
      $scope.state = 'Viewer';
    } else {
      $state.go('narrating.node.viewer');
      $scope.state = 'Writer';
    }

    // Function to switch between states
    $scope.switchMode = function () {
      if (narratorFactory.writerMode) {
        narratorFactory.writerMode = false;
        $scope.writerMode = narratorFactory.writerMode;
        $scope.state = 'Writer';
        $state.go('narrating.node.viewer');
      } else {
        narratorFactory.writerMode = true;
        $scope.writerMode = narratorFactory.writerMode;
        $scope.state = 'Viewer';
        $state.go('narrating.node.writer');
      }
    };
    
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