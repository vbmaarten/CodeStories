angular.module('narrator')
.controller('PrimitiveCtrl',function($scope){

  $scope.editorEnabled = false;

  $scope.edit = function() {
  	console.log($scope)
    $scope.editorEnabled = true;
    $scope.editableContent = $scope.$parent.primitive.text;
  };

  $scope.cancel = function() {
    $scope.editorEnabled = false;
  };

  $scope.save = function() {
    $scope.$parent.primitive.text = $scope.editableContent;
    $scope.cancel();
  };

});