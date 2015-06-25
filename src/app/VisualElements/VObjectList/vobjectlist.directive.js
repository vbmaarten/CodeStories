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

  function link(scope, element, attrs){
    console.log(element);
  }

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
    link: link
  };
})