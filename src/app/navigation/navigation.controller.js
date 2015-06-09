'use strict';
/**
 * @ngdoc controller
 * @name navigation.controller:navigationCtrl
 * @requires projectManager.factory:projectManagerFactory
 * @description
 * Controls for the user to switch states and other functionality like saving.
 */
angular.module('navigation').controller('navigationCtrl', [
  '$scope',
  'projectManagerFactory',
  function ($scope, projectManagerFactory) {
    $scope.showVObjectEditor = false;

  	$scope.saveCodeStories = function(){
  		projectManagerFactory.saveCodeStories();
  	}
  	$scope.saveZip = function(){
  		projectManagerFactory.packZip();
  	}
  }
]);