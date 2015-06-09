'use strict';
/**
 * @ngdoc controller
 * @name VObjectEditor.controller:VObjectEditorCtrl
 * @requires VObjectEditor.factory:VObjectFactory
 * @requires narrator.factory:ItemFactory
 * @requires VCodeInterpreter.factory:vCodeInterpreterFactory
 * @description
 * Editor for virtual objects
 */
angular.module('VObjectEditor').controller('VObjectEditorCtrl', [
  '$scope',
  'VObjectFactory',
  'ItemFactory',
  'vCodeInterpreterFactory',
  function ($scope, VObjectFactory, ItemFactory, vCodeInterpreterFactory) {
    $scope.VObjects = VObjectFactory.VObjects;
    $scope.selectedVObject = undefined;
    $scope.VObjectContent = '';
    $scope.VObjectName = '';
    $scope.VCode = '';
    var emptyVObject = function (data) {
      var domEl = document.createElement('div');
      var svg = d3.select(domEl).append('svg');
      function update(newData) {
      }
      update(data);
      return {
        domEl: domEl,
        //Mandatory element
        update: function (data) {
          update(data);
        }
      };
    };
    $scope.selectVObject = function (name) {
      if (name === 'New Object') {
        name = prompt('Name');
        $scope.VObjects[name] = emptyVObject;
      }
      $scope.selectedVObject = name;
      $scope.VObjectContent = $scope.VObjects[name].toString();
      $scope.VObjectName = name;
      $scope.VCode = 'var ' + name.toLowerCase() + 'Object = new ' + name + '([]);\n';
      $scope.VCode += 'display(' + name.toLowerCase() + 'Object.domEl);';
    };
    $scope.test = function () {
      $scope.saveObject();
      var VItem = new ItemFactory.VCodeItem($scope.VCode);
      vCodeInterpreterFactory.startSession();
      vCodeInterpreterFactory.runVCode(VItem, {});
      var VElement = document.getElementById('VisualElement');
      if (VElement.children.length > 0) {
        VElement.children[0].remove();
      }
      document.getElementById('VisualElement').appendChild(VItem.dom);
    };
    $scope.updateVObject = function () {
      $scope.selectVObject($scope.selectedVObject);
    };
    $scope.saveObject = function () {
      VObjectFactory.setVObject($scope.VObjectName, $scope.VObjectContent);
    };
    $scope.selectVObject(Object.keys($scope.VObjects)[0]);
  }
]);