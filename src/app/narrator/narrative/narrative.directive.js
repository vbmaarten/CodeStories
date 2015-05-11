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
      restrict: 'AE',
      templateUrl:'narrator/narrative/narrative.html',
      controller: 'NarrativeCtrl'
    }
  }).directive('addNarrativeBtn',function(){
    return {
      template:  "<div ng-show='writerMode' class='narrator-btn' ng-click='addNarrative(storyBoard,narrative);'>+</div>", 
    }
  }).directive('removeNarrativeBtn',function(){
    return {
      template:  "<div ng-show='writerMode' class='narrator-btn' ng-click='removeNarrative(storyBoard,narrative);'>-</div>",  
    }
  });




