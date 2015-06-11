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
  'notificationsFactory',
  function ($scope, VObjectFactory, ItemFactory, vCodeInterpreterFactory, notificationsFactory) {
    $scope.VObjects = VObjectFactory.VObjects;
    $scope.selectedVObject = {name: '',
                              content: '',
                              object: undefined};
    $scope.VCode = {};
    $scope.VCode.content = '';
    $scope.testCollapsed = false;

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

    $scope.newVObject = function(key){
      if($scope.VObjects[key]){
        notificationsFactory.error("VObject "+key+" already exists.")
      } else {
        $scope.VObjects[key] = emptyVObject;
      }
    }

    $scope.removeVObject = function(key){
      delete $scope.VObjects[key];
    }

    $scope.selectVObject = function (key) {
      $scope.VObjects[key]
      $scope.selectedVObject.content = $scope.VObjects[key].toString();
      $scope.selectedVObject.name = key;
      $scope.selectedVObject.object = $scope.VObjects[key];
      $scope.VCode.content = 'var ' + key.toLowerCase() + 'Object = new ' + key + '([]);\n';
      $scope.VCode.content += 'display(' + key.toLowerCase() + 'Object.domEl);';

    };

    $scope.test = function () {
      $scope.saveObject();
      var VItem = new ItemFactory.VCodeItem($scope.VCode.content);
      vCodeInterpreterFactory.newSession();
      vCodeInterpreterFactory.runVCode(VItem, {});
      var VElement = document.getElementById('VisualElement');
      if (VElement.children.length > 0) {
        VElement.children[0].remove();
      }
      document.getElementById('VisualElement').appendChild(VItem.dom);
    };

    $scope.saveObject = function () {
      if($scope.selectedVObject.object != undefined){
        VObjectFactory.setVObject($scope.selectedVObject.name, $scope.selectedVObject.content);
      }
    };

    $scope.selectVObject(Object.keys($scope.VObjects)[0]);
  }
]);