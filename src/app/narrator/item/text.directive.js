'use strict';

/**
 * @ngdoc directive
 * @name narrator.directive:textItem
 * @scope
 * @restrict AE
 * @description
 * Contains the item and its data, template changes depending on the type that
 * is passed along in the item object.
 * @param {object} item Item object.
 */
angular.module('narrator')
  .directive('textItem', function () {
    return {
      restrict: 'AE',
      templateUrl: function (elem, attr) {
        return 'narrator/item/' + attr.type + '.html';
      }
    }
  });