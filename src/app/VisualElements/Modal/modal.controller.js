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

  	$scope.close = function(){
  		modalFactory.closeModal();
  	}

  	var accessor = {};

  	accessor.activate = function(){
  		$scope.activated = true;
      $scope.onopen();
  	};

  	accessor.deactivate = function() {
  		$scope.activated = false;
      $scope.onclose();
  	};	

  	modalFactory.register($scope.name, accessor);
  }
]);