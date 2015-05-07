'use strict';

/**
 * @ngdoc function
 * @name cast.controller:CastCtrl
 * @description
 * # CastCtrl
 * Controller of the cast
 */
angular.module('cast')
  .controller('CastCtrl', ['$scope', '$stateParams', 'castFactory', function ($scope, $stateParams, castFactory) {
    $scope.directory = castFactory.cast;
    if($stateParams.path) {
        var file = castFactory.getNode($stateParams.path);
        console.log(file);
    }
  }]);
