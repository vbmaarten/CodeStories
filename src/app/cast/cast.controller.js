'use strict';

/**
 * @ngdoc function
 * @name cast.controller:CastCtrl
 * @description
 * # CastCtrl
 * Controller of the cast
 */
angular.module('cast')
  .controller('CastCtrl', function ($scope) {
    var test = {
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
	            "path": "lcov-report/prettify.css",
	            "name": "prettify.css",
	            "type": "file"
	        }, {
	            "path": "lcov-report/prettify.js",
	            "name": "prettify.js",
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
            }
          ]
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
  });
