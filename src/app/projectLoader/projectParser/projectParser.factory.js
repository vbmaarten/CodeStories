'use strict';

/**
 * @ngdoc function
 * @name projectLoader.factory:projectParser
 * @description
 * # projectParser
 * Factory for parsing a project into an CAST
 */
angular.module('projectLoader')
  .factory('projectParser', function ($scope) {
    return {
    	parse: function (code) {
    		
    		return code;
    	}
    }
  });
