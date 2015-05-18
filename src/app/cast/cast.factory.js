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
}
angular.module('cast')
  .factory('CAST', function () {
    return  { 

      project:'',
      appendNarrative:function(narratives){

        for(var castPath in narratives){
          this.getNode(castPath).addNarratives( narratives[castPath] );
        }
      

      },
      selected: undefined,

      getNode: function(path) {
        return this.cast.rootnode.getNode(path);
      },
      cast: CastMock
    }
  });




