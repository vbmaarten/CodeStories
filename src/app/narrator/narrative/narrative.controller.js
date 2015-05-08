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

  	$scope.addPrimitive = function(primitives,afterPrimitive){

  		var i = primitives.indexOf(afterPrimitive);
 		primitives.splice(i+1,0,{"type":"empty"});

 	};
 	 $scope.removePrimitive = function(primitives,primitive){
 	 	var i = primitives.indexOf(primitive)
 		primitives.splice(i+1,1);

 	};




    
  });
