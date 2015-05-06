'use strict';

/**
 * @ngdoc function
 * @name narrator.controller:NarratorCtrl
 * @description
 * # NarratorCtrl
 * Controller of the narrator
 */

 var activeNarative = [

 {'path':"/something/",
 'primitives':[
 {"text":"<p> somet text </p>"},
 {"text":"<p> more text </p>"}
 ]},
 {'path':"/someotherfile.js/",
 'primitives':[
 {"text":"<p> this is about otherfile.js</p>"},
 {"text":"<p> and so is this </p>"}
 ]}
 ]


 angular.module('narrator', [])
 .controller('NarratorCtrl', function ($scope) {

 	$scope.writer = false;

 	// All the steps that have been executed so far
 	$scope.stepped = activeNarative
 	$scope.currentNaratives

 	

 	function next(){



 	}





 });
