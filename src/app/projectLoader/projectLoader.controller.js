'use strict';
/**
 * @ngdoc function
 * @name projectLoader.controller:ProjectLoaderCtrl
 * @description
 * # ProjectLoaderCtrl
 * Controller of the project loader
 */
 angular.module('projectLoader').controller('ProjectLoaderCtrl', [
 	'$scope',
 	'$http',
 	'$stateParams',
 	'CAST',
  'projectLoaderFactory',
 	function ($scope, $http, $stateParams, CAST, projectLoaderFactory) {
    $scope.projectLoaded = false;

    if (CAST.project !== $stateParams.project) {
      console.log($stateParams);
      CAST.project = $stateParams.project;
      if (CAST.project.endsWith('.zip')) {
        $http({
          url: '/stories/' + $stateParams.project,
          method: 'GET',
          responseType: 'arraybuffer'
        }).success(function (data) {
          projectLoaderFactory.loadZip(data);
          CAST.setSelected($stateParams.path);
        }).error(function () {
          console.error('project not found');
        });
      }
    } else if (CAST.project === $stateParams.project && CAST.selectedPath !== $stateParams.path) {
      CAST.selectedPath = $stateParams.path;
      CAST.setSelected($stateParams.path);

      if(CAST.selected.isASTNode()){
        var parent = CAST.selected.getParent();
        while (!parent.content){
          parent = parent.getParent();
        }
        CAST.content = parent.content;
      } else if(CAST.selected.isFile()){
        CAST.content = CAST.selected.content;
      } else {
        CAST.content = "This is a folder";
      }
    }
        
    $scope.loadZip = function(data){
      projectLoaderFactory.loadZip(data);
      $scope.projectLoaded = true;
    };

    $scope.packZip = function(data){
      projectLoaderFactory.packZip();
    }
  }
]);