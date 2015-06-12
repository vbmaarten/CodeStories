'use strict';
/**
 * @ngdoc directive
 * @name codeStoriesApp.directive:githubloader
 * @scope
 * @restrict E
 * @description
 * Handles loading of github repositories files;
 */
angular.module('codeStoriesApp')
  .directive('examples', function () {
    return {
      restrict: 'E',
      templateUrl:'homeScreen/examples.html',
    }
  });
