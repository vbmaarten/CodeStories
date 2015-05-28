angular.module('codeStoriesApp')
  .directive('fileloader', function(){
  	return {
  		restrict: 'E',
  		transclude: true,
  		templateUrl: 'homeScreen/fileupload.html',
  	};
  });