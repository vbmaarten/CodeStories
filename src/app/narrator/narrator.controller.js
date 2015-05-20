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


    $scope.addNarrative = function(){
      var newNarrative  ;
      if($scope.activeNode.isASTNode()){
        newNarrative = new CodeNarrative('New Narrative', CAST.selectedPath);
      } else {
        newNarrative = new FSNarrative('New Narrative', CAST.selectedPath);
      }
      $scope.narratives.push(newNarrative);
    };

    // Get the current active node in the CAST
    $scope.narratives = [];
    $scope.activeNode = '/';
    $scope.$watch('CAST.selectedPath',function(newval,oldval,scope){
      scope.activeNode = CAST.selected;
      scope.narratives = CAST.getSelectedNarratives();
      console.log(scope);
    })

    

    console.log($scope.activeNode);

    // Get the narratives of the current node
    

    
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
      narratorFactory.narrativeLink = false;
      $scope.playing = true;
    } else {
      $scope.selected = false;
      $scope.selectedNarrative = {};
      $scope.playing = false;
    }
  }
  ]);