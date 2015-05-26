'use strict';

/**
 * @ngdoc controller
 * @name narrator.controller:NarrativeCtrl
 * @requires narrator.factory:narratorFactory
 * @description
 * Controller of the narrative.
 */
angular.module('narrator')
  .controller('NarrativeCtrl', ['$scope', 'narratorFactory', function ($scope, narratorFactory) {

    $scope.edit = narratorFactory.writerMode;


  }]);
