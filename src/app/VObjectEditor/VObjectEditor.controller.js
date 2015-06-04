	'use strict';
/**
 * @ngdoc controller
 * @name codeStoriesApp.controller:HomeScreenCtrl
 * @requires projectManager.factory:projectManagerFactory
 * @requires cast.factory:CAST
 * @description
 * The home screen of the app. Starting page and allows for the user to upload a
 * compressed project to narrate using the app.
 */
angular.module('VObjectEditor')
.controller('VObjectEditorCtrl', ['$scope', 'VObjectFactory', function ($scope, VObjectFactory) {
	$scope.VObjects = VObjectFactory.VObjects;
	$scope.selectedVObject = undefined;
	$scope.VObjectContent = "";
	$scope.VObjectName = "";

	var emptyVObject = function (data){
		var domEl = document.createElement('div');
		var svg = d3.select(domEl).append("svg");

		function update(newData){
		}

		update(data);

		return {
			domEl : domEl, //Mandatory element
			update : function(data){update(data)}
		}
	}

	$scope.selectVObject = function(name){
		if(name == "New Object"){
			name = prompt("Name");
			$scope.VObjects[name] = emptyVObject;
		}
		$scope.selectedVObject = name;
		$scope.VObjectContent = $scope.VObjects[name].toString();
		$scope.VObjectName = name;
	}

	$scope.updateVObject = function(){
		$scope.selectVObject($scope.selectedVObject);
	}

	$scope.saveObject = function(){
		VObjectFactory.setVObject($scope.VObjectName, $scope.VObjectContent);
	}

	$scope.selectVObject(Object.keys($scope.VObjects)[0]);
}]);