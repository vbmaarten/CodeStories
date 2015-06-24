'use strict';

/**
 * @ngdoc directive
 * @name narrator.directive:vcodeItem
 * @scope
 * @restrict AE
 * @description
 * Contains the item and its data, template changes depending on the type that
 * is passed along in the item object.
 * @param {object} item Item object.
 */
angular.module('narrator')
  .directive('vcodeItem', function () {
    return {
      link: function(scope,el,attrs){
                console.log('load vcode item');

        if(scope.item.dom){
          var vis = el[0].querySelector('.vcode-visual');
          vis.style.height = '250px';
          vis.appendChild(scope.item.dom);

        }
        var narrator = document.querySelector('.narrator');
        var item = el.parent().parent().parent()
        var narrative = item.parent();

        narrator.addEventListener('scroll', function(event) {
          if(item[0].offsetTop+narrative[0].offsetTop-20 < narrator.scrollTop){
            el.parent().css({'height': el[0].clientHeight + 'px'});
            item.css({'z-index': 15})
            el.addClass('top-vcode');
          }
          if(item[0].offsetTop+narrative[0].offsetTop-20 >= narrator.scrollTop){
            el.removeClass('top-vcode');
            item.css({'z-index': 16})
          }
        });

      },
      restrict: 'AE',
      templateUrl: function (elem, attr) {
                console.log('load vcode item template');

        return 'narrator/item/' + attr.type + '.html';
      },
    }
  });