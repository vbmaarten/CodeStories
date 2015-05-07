'use strict';

/**
 * @ngdoc function
 * @name cast.factory:CastFactory
 * @description
 * # CastFactory
 * Factory of the cast
 */

angular.module('cast')
  .factory('castFactory', function () {
    return  { 
      getNode: function(p) {
        var path = p.split('/').join('/,').split(',');
        
        if(path[path.length-1] == "")
          path.pop();

        console.log(path)

        var current = this.cast;
        for (var i = 0; i < path.length; i ++){
          console.log(current);
          current = current[path[i]];
        }
        return current;
      },
      setCast:function(c){
        this.cast = c;
      },
      cast: {
        "app/":{
          "cast/": {
            "directory/":{
              "directory.css":{"content":""},
              "directory.js":{"content":"","ast":""},
              "directory.html":{"content":""}
            },
            "cast.js":{"content":"","ast":""},
            "cast.html":{"content":""},
            "cast.css":{"content":""},
            "cast.factory.js":{"content":"","ast":""}
          },
          "narrator/": {
            "narrator.html":{"content":""},
            "narrator.js":{"content":"","ast":""},
            "narrator.css":{"content":""},
            "narrator.controller.js":{"content":"","ast":""}
          },
          "index.html":{"content":""},
          "app.js": {"content":"","ast":""}
        }
      }
    }
  });


/*

      {
        "name": "app",
        "type": "directory",
        "children": [
        {
          "name": "index.html",
          "type": "file",
          "content" : "<html></html>"
        }, 
        {
          "name": "app.js",
          "type": "file"
        }, 
        {
          "name": "narrator",
          "type": "directory",
          "children": [{
            "name": "narrator.html",
            "type": "file"
          }, {
            "name": "narrator.js",
            "type": "file"
          }, {
            "name": "narrator.controller.js",
            "type": "file"
          }, {
            "name": "narrative",
            "type": "directory",
            "children": [{
              "name": "narrative.controller.js",
              "type": "file"
            }, {
              "name": "narrative.directive.js",
              "type": "file"
            }]
          }]
        }, {
          "name": "cast",
          "type": "directory",
          "children": [{
            "name": "cast.html",
            "type": "file"
          }, {
            "name": "cast.js",
            "type": "file"
          }, {
            "name": "cast.css",
            "type": "file"
          }]
        }]
      }

*/