'use strict';

/**
 * @ngdoc function
 * @name explorer.controller:ExplorerCtrl
 * @description
 * @requires cast.factory:CAST 
 * 
 * Provides functionality to the CAST Explorer
 */

angular.module('explorer')
  .controller('DirectoryCtrl', ['$scope', 'CAST',
    function ($scope, CAST) {
    $scope.directory = CAST.cast;
    $scope.project = CAST.project;
  }]);
