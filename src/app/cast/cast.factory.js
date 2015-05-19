'use strict';

/**
 * @ngdoc function
 * @name cast.factory:CAST
 * @description
 * # CAST
 * Factory of the cast
 */



var CastMock = {
  'rootnode': new FolderNode('rootnode',null,{})
};
 
angular.module('cast')
  .factory('CAST', function () {
    return  { 
      // CAST object
      cast: CastMock,
      // Currently selected node in the CAST
      selected: undefined,
      // Path to the currently selected node
      selectePath: '',
      // File content corresponding to the current node
      content: '',
      // Root url
      project: '',
      // Appends narratives 
      appendNarrative:function(narratives){
        for(var castPath in narratives){
          this.getNode(castPath).addNarratives( narratives[castPath] );
        }
      },
      // Return node that corresponds to the given path
      getNode: function(path) {
        return this.cast.rootnode.getNode(path);
      },
    };
  });




