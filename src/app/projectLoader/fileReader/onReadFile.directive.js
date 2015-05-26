'use strict';
/**
 * @ngdoc function
 * @name projectLoader.directive:onReadFile
 * @description
 * # onReadFile
 * Directive of the project loader
 */
 angular.module('projectLoader')
  .directive('onReadFile', function ($parse) {
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