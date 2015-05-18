'use strict';

/**
 * @ngdoc function
 * @name narrator.controller:NarrativeCtrl
 * @description
 * # NarrativeCtrl
 * Controller of the narrative
 */
angular.module('narrator')
  .controller('NarrativeCtrl', ['$scope', 'narratorFactory', function ($scope, narratorFactory) {

    $scope.edit = narratorFactory.writerMode;

  	$scope.addItem = function(afterItem){
  		var items = $scope.narrative.items;
  		var i = items.indexOf(afterItem);
 			items.splice(i+1,0,{"type":"empty","content":"New item"});
 		};
		
		$scope.removeItem = function(item){
  		var items = $scope.narrative.items;
			var i = items.indexOf(item);
			items.splice(i,1);
 		};

  }]);
