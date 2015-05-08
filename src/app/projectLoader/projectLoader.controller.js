'use strict';

/**
 * @ngdoc function
 * @name projectLoader.controller:ProjectLoaderCtrl
 * @description
 * # ProjectLoaderCtrl
 * Controller of the project loader
 */
angular.module('projectLoader')
  .controller('ProjectLoaderCtrl', ['$scope','CAST', function ($scope, CAST) {
  	$scope.test = function(){
  		console.log('test');
  		CAST.cast = {};
  		console.log(CAST.cast);
  	};
  }]);
