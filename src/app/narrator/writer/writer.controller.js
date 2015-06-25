'use strict';
/**
 * @ngdoc controller
 * @name narrator.controller:WriterCtrl
 * @requires cast.factory:CAST
 * @requires narrator.writerFactory
 * @description
 * Controller of the writer state of the narrator. Allows for adding and removing
 * narratives as well as selecting and deselecting narratives for editing. 
 */
angular.module('narrator').controller('WriterCtrl', [
  '$scope',
  '$state',
  '$anchorScroll',
  'CAST',
  'writerFactory',
  function ($scope, $state, $anchorScroll, CAST, writerFactory) {

    


   $scope.$on('castEvent', function (event) {
      if(writerFactory.stashed){
        writerFactory.moveStashed( CAST.selectedPath.replace( writerFactory.selectedNarrative.CASTPath , '' ) || "/"  );
        $scope.stash = undefined;
      }
    });
     

    if ($state.is('narrating.writing.editing')) {
      $scope.selectedNarrative = writerFactory.selectedNarrative;
      
      if (!$scope.selectedNarrative.hasSubNode(CAST.selectedPath))
        $state.go('narrating.writing.selecting.url');
    } else {
      writerFactory.selectedNarrative = undefined;
    }

    $scope.JSFiles = CAST.getJSFiles();





    $scope.dep = {};

    $scope.addDependency = function(){
      if($scope.dep.toAdd)
        writerFactory.addDependency($scope.dep.toAdd);
    }

    $scope.removeDependency = writerFactory.removeDependency;

    // Add a narrative
    $scope.addNarrative = function () {
      $scope.selectNarrative(writerFactory.addNarrative($scope.activeNode));
    };
    // Remove a narrative
    $scope.removeNarrative = function (narrative,event) {
      var i = $scope.narratives.indexOf(narrative);
      $scope.narratives.splice(i, 1);
      $scope.deselectNarrative();
      event.stopPropagation();
      event.preventDefault();
    };
    // Select a narrative to edit or view
    $scope.selectNarrative = function (narrative) {
      $scope.selectedNarrative = narrative;
      writerFactory.selectNarrative(narrative);
    };
    // Deselect the narrative being edited or viewed
    $scope.deselectNarrative = function () {
      writerFactory.deselectNarrative();
    };
    $scope.addItem = function (item, subpath) {
      var sel = $scope.selectedNarrative;
      if (!item){
        item = 0;
      }
      if (sel.isCodeNarrative()){
        var path = subpath || CAST.selectedPath.replace(sel.CASTPath, '');
        sel.addItem(path, null, item);
      }
      else{
        sel.addItem(null, item);
      }
    };
    $scope.removeItem = function (item, subpath) {
      var sel = $scope.selectedNarrative;
      if (sel.isCodeNarrative()) {
        sel.removeItem(item, subpath);
      } else{
        sel.removeItem(item);
      }
    };
    $scope.goToItemHook = function (hookPath) {
      console.log(writerFactory.selectedNarrative.CASTPath + hookPath);
      if(writerFactory.stashed){
        writerFactory.moveStashed(hookPath);
         $scope.stash = undefined;
      }

      $state.go('narrating.writing.editing.url', { path: writerFactory.selectedNarrative.CASTPath + hookPath });
    };
    $scope.stash = function(hook,item){
      writerFactory.stashed = {};
      writerFactory.stashed.hook = hook;
      writerFactory.stashed.item = item;
     $scope.stashed = item || hook;
    }

    $scope.friendlyName = function(hookPath){
      var node = CAST.getNode(writerFactory.selectedNarrative.CASTPath + hookPath)
      return node.locationString() + ' ' + node.getBodyName();
    }

    $scope.isSelected = function(path){
      if(path === '/')
        path = '';
      return (writerFactory.selectedNarrative.CASTPath + path === $scope.activeNode.path);
    }


  }
]);
