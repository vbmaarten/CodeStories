'use strict';
/**
 * @ngdoc directive
 * @name VObjectEditor.directive:vobjecteditor
 * @scope
 * @restrict AE
 * @description
 * Directive for editing of VObjects
 */
angular.module('VObjectEditor').directive('vobjecteditor', function () {
  return {
    templateUrl: 'VObjectEditor/VObjectEditor.html',
    restrict: 'AE',
    controller: 'VObjectEditorCtrl'
  };
});