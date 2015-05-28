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
angular.module('narrator')
  .directive('item', function () {
    return {
      transclude: true,
      restrict: 'AE',
      templateUrl: function (elem, attr) {
        if(attr.edit){
          console.log(attr);

          return 'narrator/narrative/item/item.edit.html'
        }
        return 'narrator/narrative/item/item.html';
      }
    }
  })
  .directive('itemContent', function () {
    return {
      restrict: 'AE',
      templateUrl: function (elem, attr) {
        return 'narrator/narrative/item/' + attr.type + '.html';
      }
    }
  });
