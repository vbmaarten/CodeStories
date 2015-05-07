'use strict';

/**
 * @ngdoc function
 * @name projectLoader.factory:projectParser
 * @description
 * # projectParser
 * Factory for parsing a project into an CAST
 */
angular.module('projectLoader')
  .factory('projectParser', ['castFactory', function (castFactory) {
    return {
    	parse: function (code) {
    		
    		castFactory.setCast(code);
    	}
    }
  }]);
