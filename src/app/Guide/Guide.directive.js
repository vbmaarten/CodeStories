'use strict';
/**
 * @ngdoc directive
 * @name Guide.directive:guide
 * @scope
 * @restrict AE
 * @description
 * Directive for editing of VObjects
 */
angular.module('codeStoriesApp').directive('guide', function () {
  return {
    templateUrl: 'Guide/Guide.html',
    restrict: 'AE',
    controller: 'GuideCtrl'
  };
});