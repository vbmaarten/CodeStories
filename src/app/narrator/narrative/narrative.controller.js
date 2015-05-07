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

  	$scope.addPrimitive = function(narrative,index){
  		console.log(arguments);
 		narrative.primitives.splice(index+1,0,{"text":"Empty"});

 	};
 	 $scope.removePrimitive = function(narrative,index){
 		narrative.primitives.splice(index+1,1);

 	};




    
  });
