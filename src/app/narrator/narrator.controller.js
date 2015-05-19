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
    // Get the current active node in the CAST
    $scope.activeNode = CAST.selected;

    console.log($scope.activeNode);

    // Get the narratives of the current node
    $scope.narratives = narratorFactory.narratives = $scope.activeNode.narratives;
    // If the user is able to edit the narratives or not (boolean)
    $scope.writerMode = narratorFactory.writerMode;
    // Navigate to corresponding state
    if (narratorFactory.writerMode) {
      $state.go('narrating.writer');
      $scope.state = 'Viewer';
    } else {
      $state.go('narrating.viewer');
      $scope.state = 'Writer';
    }
    // Function to switch between states
    $scope.switchMode = function () {
      if (narratorFactory.writerMode) {
        narratorFactory.writerMode = false;
        $scope.writerMode = narratorFactory.writerMode;
        $scope.state = 'Writer';
        $state.go('narrating.viewer');
      } else {
        narratorFactory.writerMode = true;
        $scope.writerMode = narratorFactory.writerMode;
        $scope.state = 'Viewer';
        $state.go('narrating.writer');
      }
    };
    // If there was a narrative linked, continue that narrative
    if (narratorFactory.narrativeLink) {
      console.log(narratorFactory.narrativeLink);
      if (!(narratorFactory.narrativeLink === true)) {
        var linked;
        for (var index in $scope.narratives) {
          if ($scope.narratives[index].name === narratorFactory.narrativeLink){
            linked = $scope.narratives[index];
          }
        }
        narratorFactory.pushNarrative(linked);
      }
      narratorFactory.narrativeLink = undefined;
      $scope.playing = true;
    } else {
      $scope.selected = false;
      $scope.selectedNarrative = {};
      $scope.playing = false;
    }
  }
  ]);