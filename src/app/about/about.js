'use strict';

/**
 * @ngdoc function
 * @name codeStoriesApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the codeStoriesApp
 */
angular.module('codeStoriesApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
