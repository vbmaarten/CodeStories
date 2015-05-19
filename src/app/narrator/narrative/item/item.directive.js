'use strict';

/**
 * @ngdoc function
 * @name narrator.directive:item
 * @description
 * # item
 * Diretive of the item
 */
angular.module('narrator')
  .directive('item', function () {
    return {
      transclude: true,
      restrict: 'A',
      scope : {
        'item': '=',
      },
      templateUrl:'narrator/narrative/item/item.html',
      controller:'ItemCtrl'
    }
  })
  .directive('itemContent', [function() {

        var getTemplate = function(contentType) {
            var templateLoader,
            baseUrl = '/narrator/narrative/item/',
            templateMap = {
                empty: 'empty.html',
                link: 'link.html',
                text: 'text.html',
                image: 'image.html',
                video: 'video.html',
                link: 'link.html',
                audio: 'audio.html',
            };

        }


        return {
            restrict: 'AE',
            scope: {
                type:'=itemType'
            },
        };
    }]);
