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
    return  { cast: {
  	    "path": "/app",
  	    "name": "app",
  	    "type": "directory",
  	    "children": [
  	    {
          "path": "/app/index.html",
          "name": "index.html",
          "type": "file"
  	    }, 
  	    {
          "path": "/app/app.js",
          "name": "app.js",
          "type": "file"
  	    }, 
  	    {
          "path": "/app/narrator",
          "name": "narrator",
          "type": "directory",
          "children": [{
            "path": "/app/narrator/narrator.html",
            "name": "narrator.html",
            "type": "file"
          }, {
            "path": "/app/narrator/narrator.js",
            "name": "narrator.js",
            "type": "file"
          }, {
            "path": "/app/narrator/narrator.controller.js",
            "name": "narrator.controller.js",
            "type": "file"
          }, {
            "path": "/app/narrator/narrative",
            "name": "narrative",
            "type": "directory",
            "children": [{
              "path": "/app/narrator/narrative/narrative.controller.js",
              "name": "narrative.controller.js",
              "type": "file"
            }, {
              "path": "/app/narrator/narrative/narrative.directive.js",
              "name": "narrative.directive.js",
              "type": "file"
            }]
          }]
  	    }, {
          "path": "/app/cast",
          "name": "cast",
          "type": "directory",
          "children": [{
            "path": "/app/cast/cast.html",
            "name": "cast.html",
            "type": "file"
          }, {
            "path": "/app/cast/cast.js",
            "name": "cast.js",
            "type": "file"
          }, {
            "path": "/app/cast/cast.css",
            "name": "cast.css",
            "type": "file"
          }]
  	    }]
  		}
    }

		
  });
