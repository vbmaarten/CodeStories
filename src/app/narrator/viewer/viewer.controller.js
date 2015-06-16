'use strict';
/**
 * @ngdoc controller
 * @name narrator.controller:ViewerCtrl
 * @requires narrator.factory:viewerFactory
 * @description
 * controls the narrator viewer. Allows for selecting and deselecting narratives 
 * for playback and advance a selected narrative. Displays the playing narrative.
 */
angular.module('narrator').controller('ViewerCtrl', [
  '$scope',
  '$state',
  'viewerFactory',
  'writerFactory',
  '$timeout',
  function ($scope, $state, viewerFactory, writerFactory,$timeout) {
    if(writerFactory.selectedNarrative) {
      var n = writerFactory.selectedNarrative; 
      writerFactory.selectedNarrative = undefined;
      $state.go('narrating.viewing.selecting', {path: n.CASTPath});
    } 

    $scope.storyboard = viewerFactory.storyboard;
    $scope.interpreterScope = viewerFactory.interpreterScope;
    $scope.debugStep = function () {
      viewerFactory.debugStep();
    };
    $scope.next = function () {
      // Do one step in the narrative
      viewerFactory.step();  // Check if the narrative is still playing after the last step
    };

    
    $scope.auto = {};
    $scope.auto.speed = 1000;

    $scope.auto.playing = false;
    var timer;
    function autoPlay(){
      if($state.is('narrating.viewing.selecting')){
        $scope.auto.playing = false;
      }

      if($scope.auto.playing ){
        $scope.next();
        console.log(parseInt($scope.auto.speed))
        timer = $timeout(autoPlay , parseInt($scope.auto.speed));
      }
    }

    $scope.startAutoPlay = function(){

      $scope.auto.playing = true;
      autoPlay();

    }
    $scope.stopAutoPlay = function(){
        $scope.auto.playing = false;
        $timeout.cancel(timer);

    }
    // Select a narrative to edit or view
    $scope.selectNarrative = function (narrative) {
      viewerFactory.selectNarrative(narrative);
    };
    // Deselect the narrative being edited or viewed
    $scope.deselectNarrative = function () {
      viewerFactory.deselectNarrative();
    };
  }
]);