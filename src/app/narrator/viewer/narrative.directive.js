'use strict';

/**
 * @ngdoc directive
 * @name narrator.directive:narrative
 * @scope
 * @restrict AE
 * @description
 * Narrative directive
 */
angular.module('narrator')
  .directive('narrative', function () {
    return {
      restrict: 'AE',
      templateUrl:'narrator/viewer/narrative.html',
      link: function (scope, el, attr) {

        var narrator = document.querySelector('.narrator');

        narrator.addEventListener('scroll', function(event) {
          if(el[0].offsetTop+20 < narrator.scrollTop)
            el.addClass('top');
          if(el[0].offsetTop+20 >= narrator.scrollTop)
            el.removeClass('top');
        });;

        Waves.attach('narrative');

      }
    }
  });