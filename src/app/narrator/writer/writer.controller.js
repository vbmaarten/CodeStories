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

     if(writerFactory.stashed){

        var newHookPath = CAST.selectedPath.replace( writerFactory.selectedNarrative.CASTPath , '' ) || "/";
        writerFactory.moveStashed( newHookPath );
      }

    if ($state.is('narrating.writing.editing')) {
      $scope.selectedNarrative = writerFactory.selectedNarrative;
      
      if (!$scope.selectedNarrative.hasSubNode(CAST.selectedPath))
        $state.go('narrating.writing.selecting');
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
      writerFactory.addNarrative($scope.activeNode);
      $scope.narratives = CAST.getSelectedNarratives();
    };
    // Remove a narrative
    $scope.removeNarrative = function (narrative) {
      var i = $scope.narratives.indexOf(narrative);
      $scope.narratives.splice(i, 1);
      $scope.deselectNarrative();
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
    $scope.addItem = function (item) {
      var sel = $scope.selectedNarrative;
      if (!item){
        item = 0;
      }
      if (sel.isCodeNarrative()){
        sel.addItem(CAST.selectedPath.replace(sel.CASTPath, ''), null, item);
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
      $state.go('narrating.writing.editing', { path: writerFactory.selectedNarrative.CASTPath + hookPath });
    };
    $scope.move = function(hook,item){
      var index = writerFactory.selectedNarrative.getHookIndex(hook.path);
      var hooks =  writerFactory.selectedNarrative.narrativeHooks ; 
      if(item){
        writerFactory.stashed  = hook.items.splice( hook.items.indexOf(item) , 1)[0] ;
        if(hook.items.length === 0){
          delete hooks[index];
        }
      } else {
        writerFactory.stashed  =  hooks[index];
        delete hooks[index];
      }
    }

  }
]);
