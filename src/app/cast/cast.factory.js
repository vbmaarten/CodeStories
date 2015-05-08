'use strict';

/**
 * @ngdoc function
 * @name cast.factory:CAST
 * @description
 * # CAST
 * Factory of the cast
 */


 var mock = {
  "/":{
    "narratives/":{
      "teststory":[
          {'type':'text','content':'somet text  '},
          {'type':'text','content':' more text  '},
          {'type':'link','content':'/app/narratives/someotherstory'}
      ],
    },
        "app/":{
          "narratives/":{
            "someotherstory":[
             {'type':'text','content':' text about some other file text  '},
             {'type':'text','content':'MOAR '}
             ],


          },
          "cast/": {
            "directory/":{
              "directory.css":{"content":""},
              "directory.js":{"content":"","ast":""},
              "directory.html":{"content":"<html></html>"}
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

angular.module('cast')
  .factory('CAST', function () {
    return  { 
      selected: undefined,

      getNode: function(p) {
        var path = p.split('/').join('/,').split(',');
        
        if(path[path.length-1] == "")
          path.pop();

        var current = this.cast;
        for (var i = 0; i < path.length; i ++){
          current = current[path[i]];
        }
        return current;
      },
      cast: mock
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