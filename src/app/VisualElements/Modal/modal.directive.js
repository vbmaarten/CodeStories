'use strict';
/**
 * @ngdoc directive
 * @name VisualElements.directive:modal
 * @scope
 * @restrict
 * @description
 * Creates a modal
 */
angular.module('VisualElements').directive('modal', function () {
  return {
    restrict: 'E',
    templateUrl: 'VisualElements/Modal/templates/modal.html',
    controller: 'ModalCtrl',
    scope: {
    	name: "@",
    	title: "@",
        onclose: "&",
        onopen: "&"
    },
    transclude: true
  };
});