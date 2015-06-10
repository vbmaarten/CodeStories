'use strict';

/**
 * @ngdoc directive
 * @name narrator.directive:narrative
 * @scope
 * @restrict AE
 * @description
 * Narrative directive
 */
angular.module('narrator')
  .directive('narrative', function () {
    return {
      restrict: 'AE',
      templateUrl:'narrator/viewer/narrative.html',
      link: function (scope, el, attr) {

        console.log(el.parent().parent());

        el.parent().parent()[0].addEventListener('resize', function() {
          console.log('addEventListener - resize');
        }, true);;

      }
    }
  });