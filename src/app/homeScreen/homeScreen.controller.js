'use strict';
/**
 * @ngdoc function
 * @name projectLoader.controller:ProjectLoaderCtrl
 * @description
 * # ProjectLoaderCtrl
 * Controller of the project loader
 */
angular.module('codeStoriesApp')
.controller('HomeScreenCtrl', ['$scope', '$location', 'projectLoaderFactory', 'CAST', function ($scope, $location, projectLoaderFactory, CAST) {
	
	$scope.message = "Upload a .zip file of your project";

	$scope.castReady = true;

	$scope.loadZip = function(data){
		$scope.castReady = false;
		console.log(data);
		projectLoaderFactory.loadZip(data);
	};

	$scope.goToNarrator = function () {
		console.log(CAST);
		$location.path(CAST.project);
	}


}])
.directive("fileread", [function () {
  return {
    scope: {
      fileread: "="
    },
    link: function (scope, element, attributes) {
      element.bind("change", function (changeEvent) {
        scope.$apply(function () {
          scope.fileread = changeEvent.target.files[0].name;
          // or all selected files:
          // scope.fileread = changeEvent.target.files;
        });
      });
    }
  }
}]);