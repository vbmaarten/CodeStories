'use strict';
/**
 * @ngdoc controller
 * @name narrator.controller:NarratorCtrl
 * @requires cast.factory:CAST
 * @description
 * Controls the current state of the narrator; viewing or editing. As well as
 * obtaining the currently selected node and narrative. Also checks if there was
 * a narrative playing (Will be replaced by $state in the future).
 */
angular.module('navigation').controller('navigationCtrl', [
  '$scope',
  'projectManagerFactory',
  function ($scope, projectManagerFactory) {
  	$scope.saveCodeStories = function(){
  		projectManagerFactory.saveCodeStories();
  	}
  }
]);