'use strict';
/**
 * @ngdoc directive
 * @name codeStoriesApp.directive:fileloader
 * @scope
 * @restrict E
 * @description
 * Handles loading of zip files;
 */

angular.module('codeStoriesApp')
  .directive('fileloader', function(){
  	return {
  		restrict: 'E',
  		transclude: true,
  		templateUrl: 'homeScreen/fileupload.html',
  	};
  });