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

    

    function showError(error){
      var VElement = document.getElementById('VisualElement');
      VElement.innerHTML = ''
      var errorMsg = document.createElement('div');
        errorMsg.innerHTML = error.message + ' [ ' + error.columnNumber + ' : ' + error.lineNumber + ' ] ';
        VElement.appendChild(errorMsg)
    }

    $scope.saveObject = function (){
      try{
      if($scope.selectedVObject.object != undefined){
        VObjectFactory.setVObject($scope.selectedVObject.name, $scope.selectedVObject.content);
      }
      } catch (error){
        showError(error);
        throw(error);
      }
    };

    var emptyVObject = function (data) {
      var domEl = document.createElement('div');
      var svg = d3.select(domEl).append('svg');
      var height = this.height, width = this.width, center = this.center, data;

      function update(newData) {
        var group = svg.selectAll('g').data(newData);
        group.exit().remove(); //exit 
        group.enter().append('g').text(function(d,i){return ''+d}) //enter 
        group.attr('color','red') // update 

      }
      update(data);
      return {
        domEl: domEl, 
        update: update
      };
    };

    $scope.newVObject = function(key){
      if(!key.trim()){
        return;
      }

      if($scope.VObjects[key]){
        notificationsFactory.error("VObject "+key+" already exists.")
      } else {
        $scope.VObjects[key] = emptyVObject;
      }
    }

    $scope.removeVObject = function(key){
      delete $scope.VObjects[key];
    }

    $scope.selectVObject = function (key) {2
      $scope.VObjects[key]
      $scope.selectedVObject.content = $scope.VObjects[key].toString();
      $scope.selectedVObject.name = key;
      $scope.selectedVObject.object = $scope.VObjects[key];
      $scope.VCode.content = 'var ' + key.toLowerCase() + 'Object = new ' + key + '([]);\n';
      $scope.VCode.content += 'display(' + key.toLowerCase() + 'Object.domEl);';
      console.log($scope.selectedVObject);
    };

    $scope.test = function () {
      var VElement = document.getElementById('VisualElement');
      try{ 
        $scope.saveObject();
        var VItem = new ItemFactory.VCodeItem($scope.VCode.content);
        vCodeInterpreterFactory.newSession();
        VElement.innerHTML = ''
        
        vCodeInterpreterFactory.runVCode(VItem, {});
        VElement.appendChild(VItem.dom);
      } catch (error){
        showError(error);
      }
    };

    $scope.selectVObject(Object.keys($scope.VObjects)[0]);
  }
]);