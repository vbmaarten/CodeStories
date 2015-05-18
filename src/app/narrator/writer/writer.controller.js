'use strict';

/**
 * @ngdoc function
 * @name narrator.controller:WriterCtrl
 * @description
 * # WriterCtrl
 * Controller of the writer state of the narrator
 */

angular.module('narrator')
  .controller('WriterCtrl', [ '$scope',	'narratorFactory', function ($scope, narratorFactory) {

  var narratives = narratorFactory.narratives;

 	$scope.addNarrative = function(afterNarrative){
 		var i = narratives.indexOf(afterNarrative);
 		narratives.splice(i+1,0,{name:"New Narrative",items:[]});
 	};
 	$scope.removeNarrative = function(narrative){
 		var i = narratives.indexOf(narrative);
 		narratives.splice(i,1);
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
