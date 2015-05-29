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
      link: function(scope,elements,attrs){
        if(scope.item.dom){
          elements[0].appendChild(scope.item.dom)
        }
      },
      restrict: 'AE',
      templateUrl: 'narrator/narrative/item/item.html'
    }
  })
  .directive('itemEdit', function () {
    return {
      transclude: true,
      restrict: 'AE',
      templateUrl: 'narrator/narrative/item/item.edit.html'
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
