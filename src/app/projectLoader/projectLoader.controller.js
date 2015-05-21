'use strict';
/**
 * @ngdoc function
 * @name projectLoader.controller:ProjectLoaderCtrl
 * @description
 * # ProjectLoaderCtrl
 * Controller of the project loader
 */
 angular.module('projectLoader').controller('ProjectLoaderCtrl', [
 	'$scope',
  'projectLoaderFactory',
 	function ($scope, projectLoaderFactory) {
    $scope.projectLoaded = false;
        
    $scope.loadZip = function(data){
      projectLoaderFactory.loadZip(data);
      $scope.projectLoaded = true;
    };

    $scope.packZip = function(data){
      projectLoaderFactory.packZip();
    }
  }
]);