'use strict';

/**
 * @ngdoc directive
 * @name narrator.directive:item
 * @scope
 * @restrict AE
 * @description
 * Contains the item and its data, template changes depending on the type that
 * is passed along in the item object.
 * @param {object} item Item object.
 */
angular.module('narrator')
  .directive('item', function () {
    return {
      transclude: true,
      restrict: 'AE',
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
