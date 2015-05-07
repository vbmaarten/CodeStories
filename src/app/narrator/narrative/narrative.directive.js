'use strict';

/**
 * @ngdoc function
 * @name narrator.directive:narrative
 * @description
 * # narrative
 * Diretive of the narrative
 */
angular.module('narrator')
  .directive('narrative', function () {
    return {
    	templateUrl:'narrator/narrative/narrative.html',
    }
  }).directive('primitive', function () {
    return {
    	templateUrl:'narrator/narrative/primitives/primitive.html',
    }
  }).directive('addNarrativeBtn',function(){
  	return {
  		template:  "<div ng-show='writerMode' ng-click='addNarrative(storyBoard,$index);'>+</div>",	
  	}
  }).directive('removeNarrativeBtn',function(){
  	return {
  		template:  "<div ng-show='writerMode' ng-click='removeNarrative(storyBoard,$index);'>-</div>",	
  	}
  }).directive('addPrimitiveBtn',function(){
  	return {
  		template:  "<div ng-show='writerMode' ng-click='addPrimitive(narrative,$index,atindex);'>+</div>",	
  	};
  }).directive('removePrimitiveBtn',function(){
 	return {
  		template:  "<div ng-show='writerMode' ng-click='removePrimitive(narrative,$index);'>-</div>",	
  	};
  });
