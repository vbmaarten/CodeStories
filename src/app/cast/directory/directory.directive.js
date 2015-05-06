'use strict';

/**
 * @ngdoc function
 * @name cast.directive:directory
 * @description
 * # directory
 * Directive of the cast
 */
angular.module('cast')
  .directive('directory', function (RecursionHelper) {
    return {
    	restrict: 'A',
    	scope: {
    		data: '='
    	},
    	templateUrl: '/cast/directory/directory.html',
    	controller: function ($scope) {
    		console.log($scope.data);
    	},
    	compile: function(element) {
        // Use the compile function from the RecursionHelper,
        // And return the linking function(s) which it returns
        return RecursionHelper.compile(element);
      }
    }
  });
