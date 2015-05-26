'use strict';

/**
 * @ngdoc directive
 * @name narrator.directive:narrative
 * @scope
 * @restrict AE
 * @description
 * Diretive of the narrative
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
      controller: 'NarrativeCtrl'
    }
  });




