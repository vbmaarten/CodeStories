'use strict';

/**
 * @ngdoc function
 * @name narrator.controller:NarrativeCtrl
 * @description
 * # NarrativeCtrl
 * Controller of the narrative
 */
angular.module('narrator')
  .controller('NarrativeCtrl', function ($scope) {

  	$scope.addItem = function(items,afterItem){

  		var i = items.indexOf(afterItem);
 		items.splice(i+1,0,{"type":"empty"});

 	};
 	 $scope.removeItem = function(items,item){
 	 	var i = items.indexOf(item)
 		items.splice(i+1,1);

 	};
    
  });
