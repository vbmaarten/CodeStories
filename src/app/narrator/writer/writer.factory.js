'use strict';

/**
 * @ngdoc service
 * @name narrator.factory:writerFactory
 * @requires cast.factory:CAST
 * @requires narrator.factory:interpreterFactory
 * @description
 *
 * Factory of the writer, containers logic of the writer like selecting, deselecting
 * creating new items and handling itemhooks.
 */

angular.module('narrator')
 .factory('writerFactory', ['$state', '$stateParams', 'CAST',
  function ($state, $stateParams, CAST) {
  return {

      selectedNarrative: undefined,

      /**
       * @ngdoc method
       * @name selectNarrative
       * @methodOf narrator.factory:writerFactory
       * @description
       * First deselects a narrative if any narrative is still editing. Then sets the
       * current state to editing and pushes the given narrative on the queue.
       *
       * @param {object} narrative a narrative object to play.
       */     
      selectNarrative: function(narrative){
        this.selectedNarrative = narrative;
        $state.go('narrating.writing.editing');
      },

      /**
       * @ngdoc method
       * @name deselectNarrative
       * @methodOf narrator.factory:writerFactory
       * @description
       * Deselects the current editing narrative. This empties the queue and sets
       * the editing state to false.
       */ 
      deselectNarrative: function(){
        if(this.selectedNarrative) {
          var path = this.selectedNarrative.CASTPath
          this.selectedNarrative = undefined;
          $state.go('narrating.writing.selecting', {path: path});
        }
      },

    }
  }]);



