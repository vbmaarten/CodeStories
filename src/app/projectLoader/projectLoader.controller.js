'use strict';
/**
 * @ngdoc controller
 * @name projectLoader.controller:ProjectLoaderCtrl
 * @description
 * @requires projectLoader.factory:projectLoaderFactory
 * Adds the functionality to the app to load and export projects
 */
 angular.module('projectLoader').controller('ProjectLoaderCtrl', [
 	'$scope',
  'projectLoaderFactory',
 	function ($scope, projectLoaderFactory) {
    $scope.projectLoaded = false;
  
    /**
    * @ngdoc method
    * @name loadZip
    * @methodOf projectLoader.controller:ProjectLoaderCtrl
    * @description
    * Makes use of the projectLoaderFactory to load a project from a zip file  
    *
    * @param {String} data Raw data of the zip file
    */
    $scope.loadZip = function(data){
      projectLoaderFactory.loadZip(data);
      $scope.projectLoaded = true;
    };

    /**
    * @ngdoc method
    * @name packZip
    * @methodOf projectLoader.controller:ProjectLoaderCtrl
    * @description
    * Makes use of the projectLoaderFactory to generate a zip of the current project state and Makes it downloadable in the browser.   
    *
    */
    $scope.packZip = function(data){
      projectLoaderFactory.packZip();
    }
  }
]);