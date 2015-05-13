'use strict';

/**
 * @ngdoc function
 * @name narrator.factory:narrator
 * @description
 * # narratorFactory
 * Factory of the narrator, containers logic of the state of the narrator.
 */

angular.module('narrator')
  .factory('narratorFactory', function () {
    return  { 
      writerMode: false,
      narratorState: [],

    }
  });




