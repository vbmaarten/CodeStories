'use strict';

/**
 * @ngdoc directive
 * @name narrator.directive:dynamic-scroll
 * @scope
 * @restrict A
 * @description
 * Directive to animate the scrolling of the narrator.
 */
angular.module('narrator')
  .directive('dynamicScroll', ['$interval', 'viewerFactory', function($interval, viewerFactory){
    return {
      restrict: 'A',
      link: function (scope, el, attr) {
        var interval = 50;
        scope.$on('storyboardEvent', function() {
          console.log('resizing narrator');
          var i = 0;
          var scroll = $interval(function(){
            el[0].scrollTop = el[0].scrollHeight;
            i++;
            if(i > (1000/interval))
              $interval.cancel(scroll);
          }, interval);
        });

      } 
    }
  }]);