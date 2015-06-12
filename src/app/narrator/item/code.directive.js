'use strict';

/**
 * @ngdoc directive
 * @name narrator.directive:codeItem
 * @scope
 * @restrict AE
 * @description
 * executed inside the interpreter scope
 * @param {object} item Item object.
 */
angular.module('narrator').directive('code', function () {
  return {
    restrict: 'AE',
    templateUrl: 'narrator/item/code.html'
  };
}).directive('codeEdit', function () {
  return {
    transclude: true,
    restrict: 'AE',
    templateUrl: 'narrator/item/code.edit.html'
  };
});