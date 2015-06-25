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
angular.module('narrator').directive('codeItem', function () {
  return {
    restrict: 'AE',
	templateUrl: function (elem, attr) {
        return 'narrator/item/' + attr.type + '.html';
      },
  };
})