'use strict';
/**
 * @ngdoc directive
 * @name VisualElements.directive:itemlist
 * @scope
 * @restrict
 * @description
 * Creates a itemlist
 */
angular.module('VisualElements').directive('vobjectlist', function () {
  return {
    restrict: 'E',
    templateUrl: 'VisualElements/VObjectList/templates/VObjectList.html',
    controller: 'VObjectListCtrl',
    scope: {
        items: "=",
        onselect: "&",
        onremove: "&",
        onadd: "&"
    },
  };
});