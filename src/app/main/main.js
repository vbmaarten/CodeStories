'use strict';

/**
 * @ngdoc function
 * @name codeStoriesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the codeStoriesApp
 */
angular.module('codeStoriesApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
