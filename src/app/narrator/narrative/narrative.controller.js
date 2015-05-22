'use strict';

/**
 * @ngdoc function
 * @name narrator.controller:NarrativeCtrl
 * @description
 * # NarrativeCtrl
 * Controller of the narrative
 */
angular.module('narrator')
  .controller('NarrativeCtrl', ['$scope', 'narratorFactory', function ($scope, narratorFactory) {

    $scope.edit = narratorFactory.writerMode;


  }]);
