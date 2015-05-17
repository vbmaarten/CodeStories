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

}]);
