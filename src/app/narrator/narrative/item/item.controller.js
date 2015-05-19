angular.module('narrator')
.controller('ItemCtrl',['$scope', 'narratorFactory', function($scope, narratorFactory){

  $scope.edit = narratorFactory.writerMode;


}]);