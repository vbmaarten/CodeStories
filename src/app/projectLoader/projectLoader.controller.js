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
 	function ($scope, $http, $stateParams, CAST) {
 		if (CAST.project !== $stateParams.project) {
 			console.log($stateParams);
 			CAST.project = $stateParams.project;
 			if (CAST.project.endsWith('.zip')) {
 				$http({
 					url: '/stories/' + $stateParams.project,
 					method: 'GET',
 					responseType: 'arraybuffer'
 				}).success(function (data) {
 					$scope.loadZip(data);
 					CAST.selectedPath = $stateParams.path;
 					CAST.selected = CAST.cast.rootnode.getNode($stateParams.path);
 				}).error(function () {
 					console.error('project not found');
 				});
 			}
 		} else if (CAST.project === $stateParams.project && CAST.selectedPath !== $stateParams.path) {
 			CAST.selectedPath = $stateParams.path;
 			CAST.selected = CAST.cast.rootnode.getNode($stateParams.path);
 		}
 		var BuildCASTFromZip = function (zip) {
 			console.log(zip.files);
 			var root = new FolderNode('project', null, {});
 			Object.getOwnPropertyNames(zip.files).forEach(function (element, index, array) {
 				var isDirectory = element.slice(-1) === '/';
 				var isJS = false;
 				var path = element.split('/');
 				if (isDirectory) {
 					path.pop();
 				}
 				var last = path.pop();
 				if (!isDirectory) {
 					if (last.split('.').pop() === 'js') {
 						isJS = true;
 					}
 				}
 				var newRoot = root;
 				path.forEach(function (element, index, arary) {
 					if (root.children[element]) {
 						newRoot = root.children[element];
 					} else {
 						root.children[element] = new FolderNode(element, root, {});
 						newRoot = root.children[element];
 					}
 				});
 				if (!newRoot.children[last]) {
 					if (isDirectory) {
 						newRoot.children[last] = new FolderNode(last, root, {});
 					} else {
 						console.log(element);
 						newRoot.children[last] = new FileNode(last, root, {}, zip.file(element).asText());
 						if (isJS) {
 							newRoot.children[last].children.program = acorn.parse(zip.file(element).asText());
 							newRoot.children[last].children.program.setParent( newRoot.children[last] );
 						}
 					}
 				}
 			});
return root;
};
var addNarrativesToCast = function (narratives) {
	if (typeof narratives === 'string'){
		narratives = JSON.parse(narratives);
	}
	CAST.appendNarrative(narratives);
};
$scope.loadZip = function (data) {
	CAST.cast.rootnode = BuildCASTFromZip( new JSZip(data) );
	var narrativePath = $stateParams.project.substr(0, $stateParams.project.length - 4) + '.json';
	$http.get(/stories/ + narrativePath).success(function (data) {
		addNarrativesToCast(data);
	});
};
}
]).directive('onReadFile', function ($parse) {
  //from http://jsfiddle.net/alexsuch/6aG4x/
  return {
  	restrict: 'A',
  	scope: false,
  	link: function (scope, element, attrs) {
  		var fn = $parse(attrs.onReadFile);
  		element.on('change', function (onChangeEvent) {
  			var reader = new FileReader();
  			reader.onload = function (onLoadEvent) {
  				scope.$apply(function () {
  					fn(scope, { $fileContent: onLoadEvent.target.result });
  				});
  			};
  			reader.readAsBinaryString((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
  		});
  	}
  };
});