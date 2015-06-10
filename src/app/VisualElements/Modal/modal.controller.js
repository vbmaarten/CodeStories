'use strict';
/**
 * @ngdoc controller
 * @name VisualElements.controller:ModalCtrl
 * @description
 * Controller for modals
 */
angular.module('VisualElements').controller('ModalCtrl', ['$scope', 'modalFactory',
  function ($scope, modalFactory) {
  	$scope.activated = false;

  	var accessor = {};
  	accessor.activate = function(){
  		$scope.activated = true;
  		$scope.$apply();
  		$scope.onopen();
  	}

  	accessor.deactivate = function(){
  		console.log("called");
  		$scope.activated = false;
  		$scope.$apply();
  		$scope.onclose();
  	}

  	modalFactory.register($scope.name, accessor);
  }
]);