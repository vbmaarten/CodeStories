'use strict';
/**
 * @ngdoc directive
 * @name narrator.directive:item
 * @scope
 * @restrict AE
 * @description
 * Contains the item and its data, template changes depending on the type that
 * is passed along in the item object.
 * @param {object} item Item object.
 */
angular.module('narrator').directive('item', function () {
  return {
    restrict: 'AE',
    templateUrl: 'narrator/item/item.html'
  };
}).directive('itemEdit', function () {
  return {
    transclude: true,
    restrict: 'AE',
    templateUrl: 'narrator/item/item.edit.html'
  };
});