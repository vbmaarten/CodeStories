'use strict';
/**
 * @ngdoc controller
 * @name narrator.controller:WriterCtrl
 * @requires cast.factory:CAST
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
    if ($state.is('narrating.writing.editing')) {
      $scope.selectedNarrative = writerFactory.selectedNarrative;
      if (!$scope.selectedNarrative.hasSubNode(CAST.selectedPath))
        $state.go('narrating.writing.selecting');
    } else {
      writerFactory.selectedNarrative = undefined;
    }
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
    $scope.goToItemHook = function (hook) {
      console.log(writerFactory.selectedNarrative.CASTPath + hook);
      $state.go('narrating.writing.editing', { path: writerFactory.selectedNarrative.CASTPath + hook });
    };
  }
]);
