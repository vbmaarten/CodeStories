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
	            "name": "index.html",
	            "type": "file"
	        }, {
	            "parent": "lcov-report",
	            "path": "lcov-report/prettify.css",
	            "name": "prettify.css",
	            "type": "file"
	        }, {
	            "parent": "lcov-report",
	            "path": "lcov-report/prettify.js",
	            "name": "prettify.js",
	            "type": "file"
	        }, {
            "parent": "lcov-report",
            "path": "lcov-report/src",
            "name": "src",
            "type": "directory",
            "children": [{
                "parent": "lcov-report/src",
                "path": "lcov-report/src/createDirectoryObject.js.html",
                "name": "createDirectoryObject.js.html",
                "type": "file"
            }, {
                "parent": "lcov-report/src",
                "path": "lcov-report/src/index.html",
                "name": "index.html",
                "type": "file"
            }, {
                "parent": "lcov-report/src",
                "path": "lcov-report/src/main.js.html",
                "name": "main.js.html",
                "type": "file"
            }]
        }]
	    }, {
        "parent": "",
        "path": "cast",
        "name": "cast",
        "type": "directory",
        "children": [{
            "parent": "cast",
            "path": "cast/cast.html",
            "name": "cast.html",
            "type": "file"
        }, {
            "parent": "cast",
            "path": "cast/cast.js",
            "name": "cast.js",
            "type": "file"
        }, {
            "parent": "cast",
            "path": "cast/cast.css",
            "name": "cast.css",
            "type": "file"
        }]
	    }]
		}
  });
