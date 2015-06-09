'use strict';

angular.module('codeStoriesApp')
  .directive('githubloader', function () {
    return {
      restrict: 'E',
      templateUrl:'homeScreen/githubloader.html',
    }
  });
