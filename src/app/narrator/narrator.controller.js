'use strict';

/**
 * @ngdoc function
 * @name narrator.controller:NarratorCtrl
 * @description
 * # NarratorCtrl
 * Controller of the narrator
 */

angular.module('narrator')
  .controller('NarratorCtrl', [ '$scope', 'CAST', 
  	function ($scope, $state, CAST, narratorFactory) {

 	// State of the narrator, contains a list of the active narratives

  $scope.$watch('CAST.selected',function(old,newVal){
    $scope.activeNode = newVal;
  })

  	$scope.state = "Writer";


  // Function to switch between states
  $scope.switchMode = function(){
  	if(narratorFactory.writerMode){
  		narratorFactory.writerMode = false;
  		$scope.writerMode = narratorFactory.writerMode;
  		$scope.state="Viewer";
	  	$state.go('narrating.viewer');
  	}
	  else{
	  	narratorFactory.writerMode = true;
  		$scope.writerMode = narratorFactory.writerMode;
  		$scope.state="Writer"
	  	$state.go('narrating.writer');
	  }
  }


}]);
