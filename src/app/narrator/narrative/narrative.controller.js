'use strict';

/**
 * @ngdoc controller
 * @name narrator.controller:NarrativeCtrl
 * @requires narrator.factory:narratorFactory
 * @description
 * Controls the narrative directive. Determines the edit mode.
 */
angular.module('narrator')
  .controller('NarrativeCtrl', ['$scope', 'narratorFactory', function ($scope, narratorFactory) {

    $scope.edit = narratorFactory.writerMode;


  }]);
