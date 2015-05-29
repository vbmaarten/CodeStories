'use strict';

/**
 * @ngdoc directive
 * @name narrator.directive:linkItem
 * @scope
 * @restrict AE
 * @description
 * Contains the item and its data, template changes depending on the type that
 * is passed along in the item object.
 * @param {object} item Item object.
 */
angular.module('narrator')
  .directive('linkItem', function () {
    return {
      restrict: 'AE',
      templateUrl: function (elem, attr) {
        return 'narrator/narrative/item/' + attr.type + '.html';
      },
      controller : ['$scope', function($scope){
        
      }]
    }
  });