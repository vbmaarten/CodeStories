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
  'modalFactory',
  function ($scope, projectManagerFactory, modalFactory) {
    $scope.showVObjectEditor = false;

  	$scope.saveCodeStories = function(){
  		projectManagerFactory.saveCodeStories();
  	}
  	$scope.saveZip = function(){
  		projectManagerFactory.packZip();
  	}
    $scope.openEditor = function(){
      modalFactory.activate("VObjectEditor")
    }
    $scope.openGuide = function(){
      modalFactory.activate("guide");
    }
  }
]);