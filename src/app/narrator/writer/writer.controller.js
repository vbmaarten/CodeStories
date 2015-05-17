'use strict';

/**
 * @ngdoc function
 * @name narrator.controller:WriterCtrl
 * @description
 * # WriterCtrl
 * Controller of the writer state of the narrator
 */

angular.module('narrator')
  .controller('WriterCtrl', [ '$scope',	function ($scope) {


 	$scope.addNarrative = function(storyBoard,afterNarrative){
 		var i = storyBoard.indexOf(afterNarrative);
 		storyBoard.splice(i+1,0,[]);
 	};
 	$scope.removeNarrative = function(storyBoard,narrative){
 		var i = storyBoard.indexOf(narrative);
 		storyBoard.splice(i,1);
 	};

}]);
