'use strict';

/**
 * @ngdoc directive
 * @name narrator.directive:narrative
 * @scope
 * @restrict AE
 * @description
 * Directive that displays the narrative object. Contains a list of items directives.
 * @param {object} data Narrative object.
 */
angular.module('narrator')
  .directive('narrative', function () {
    return {
      restrict: 'AE',
      transclude: true,
      scope: {
      	narrative : '=data',
      },
      templateUrl:'narrator/narrative/narrative.html',
    }
  });




