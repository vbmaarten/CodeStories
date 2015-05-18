'use strict';

/**
 * @ngdoc function
 * @name cast.directive:directory
 * @description
 * # directory
 * Directive of the file folder structure
 */
angular.module('explorer')
  .directive('directory', function (RecursionHelper) {
    return {
    	restrict: 'A',
    	scope: {
    		data: '=',
            castUrl: '='
    	},
    	templateUrl: '/explorer/directory/directory.html',
    	//Used to call directives recursively
    	compile: function(element) {
        // Use the compile function from the RecursionHelper,
        // And return the linking function(s) which it returns
        return RecursionHelper.compile(element);
      }
    }
  });
