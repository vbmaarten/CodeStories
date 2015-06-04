angular.module('VObjectEditor')
  .directive('vobjecteditor', function(){
  	return {
  		templateUrl: 'VObjectEditor/VObjectEditor.html',
  		controller: 'VObjectEditorCtrl'
  	};
  });