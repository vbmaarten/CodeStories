'use strict';

/**
 * @ngdoc function
 * @name explorer.filter:directoryFilter
 * @description
 * # directoryFilter
 * Filter to sort the explorer directory
 */
angular.module('explorer')
  .filter('directoryFilter', function(){
    return function(list) {
      return [];
    };
  });
