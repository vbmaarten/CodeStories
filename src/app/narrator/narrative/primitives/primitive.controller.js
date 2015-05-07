angular.module('narrator')
.controller('PrimitiveController',function($scope){

  $scope.editorEnabled = false;

  $scope.edit = function() {
  	console.log($scope)
    $scope.editorEnabled = true;
    $scope.editableText = $scope.$parent.primitive.text;
  };

  $scope.cancel = function() {
    $scope.editorEnabled = false;
  };

  $scope.save = function() {
    $scope.$parent.primitive.text = $scope.editableText;
    $scope.cancel();
  };



});