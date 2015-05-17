'use strict';

/**
 * @ngdoc function
 * @name narrator.directive:narrative
 * @description
 * # narrative
 * Diretive of the narrative
 */
angular.module('narrator')
  .directive('narrative', function () {
    return {
      restrict: 'AE',
      transclude: true,
      scope: {
      	narrative : '=data',
        edit: '='
      },
      templateUrl:'narrator/narrative/narrative.html',
      controller: 'NarrativeCtrl'
    }
  });




