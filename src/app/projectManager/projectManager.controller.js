'use strict';
/**
 * @ngdoc controller
 * @name projectManager.controller:ProjectManagerCtrl
 * @description
 * @requires projectManager.factory:projectManagerFactory
 * Adds the functionality to the app to load and export projects
 */
 angular.module('projectManager').controller('ProjectManagerCtrl', [
 	'$scope',
  'projectManagerFactory',
 	function ($scope, projectManagerFactory) {
    $scope.projectLoaded = false;
  
    /**
    * @ngdoc method
    * @name loadZip
    * @methodOf projectManager.controller:ProjectManagerCtrl
    * @description
    * Makes use of the projectManagerFactory to load a project from a zip file  
    *
    * @param {String} data Raw data of the zip file
    */
    $scope.loadZip = function(data){
      projectManagerFactory.loadZip(data);
      $scope.projectLoaded = true;
    };

    /**
    * @ngdoc method
    * @name packZip
    * @methodOf projectManager.controller:ProjectManagerCtrl
    * @description
    * Makes use of the projectManagerFactory to generate a zip of the current project state and Makes it downloadable in the browser.   
    *
    */
    $scope.packZip = function(data){
      projectManagerFactory.packZip();
    }
  }
]);