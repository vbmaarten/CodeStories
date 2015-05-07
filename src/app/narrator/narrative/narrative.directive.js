'use strict';

/**
 * @ngdoc function
 * @name narrator.directive:narrative
 * @description
 * # narrative
 * Diretive of the narrative
 */
angular.module('narrator')
  .directive('primitive', function () {
    return {
    	templateUrl:'narrator/narrative/primitives/primitive.html',
    }
  }).directive('addPrimitiveBtn',function(){
  	return {
  		template:  "<div ng-show='writerMode' class='narrator-btn' ng-click='addPrimitive(narrative.primitives,primitive);'>+</div>",	
  	};
  }).directive('removePrimitiveBtn',function(){
 	return {
  		template:  "<div ng-show='writerMode' class='narrator-btn' ng-click='removePrimitive(narrative.primitives,primitive);'>-</div>",	
  	};
  });
