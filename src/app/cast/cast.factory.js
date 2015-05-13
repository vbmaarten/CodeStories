'use strict';

/**
 * @ngdoc function
 * @name cast.factory:CAST
 * @description
 * # CAST
 * Factory of the cast
 */



  angular.module('cast')
  .factory('CAST', function () {
    return  { 
      selected: undefined,



      getNode: function(p) {
        var path = p.split('/').join('/,').split(',');
        
        if(path[path.length-1] == "")
          path.pop();

        var current = this.cast['/'];
        for (var i = 1; i < path.length; i ++){
          current = current.children[path[i]];
        }
        return current;
      },
      cast: undefined
    }
  });




