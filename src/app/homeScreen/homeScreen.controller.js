'use strict';
/**
 * @ngdoc controller
 * @name codeStoriesApp.controller:HomeScreenCtrl
 * @requires projectLoader.factory:projectLoaderFactory
 * @requires cast.factory:CAST
 * @description
 * The home screen of the app. Starting page and allows for the user to upload a
 * compressed project to narrate using the app.
 */
angular.module('codeStoriesApp')
.controller('HomeScreenCtrl', ['$scope', '$state', 'projectLoaderFactory', 'CAST', function ($scope, $state, projectLoaderFactory, CAST) {
	
	$scope.message = "Upload a .zip file of your project";

	$scope.castReady = true;

	$scope.loadZip = function(data){
		$scope.castReady = false;
		projectLoaderFactory.loadZip(data);
	};

	$scope.goToNarrator = function () {
		$scope.message;
		$state.go('narrating', {'project' : $scope.message});
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