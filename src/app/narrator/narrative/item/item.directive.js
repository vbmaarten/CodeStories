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
      templateUrl:'narrator/narrative/item/item.html',
      controller:'ItemCtrl'
    }
  }).directive('addItemBtn',function(){
    return {
      template:  "<div ng-show='writerMode' class='narrator-btn' ng-click='addItem(narrative,item);'>+</div>",  
    };
  }).directive('removeItemBtn',function(){
  return {
      template:  "<div ng-show='writerMode' class='narrator-btn' ng-click='removeItem(narrative,item);'>-</div>", 
    };
  })
  .directive('itemContent', ['$compile', '$http', '$templateCache', function($compile, $http, $templateCache) {

        var getTemplate = function(contentType) {
            var templateLoader,
            baseUrl = '/narrator/narrative/item/',
            templateMap = {
                empty: 'empty.html',
                link: 'link.html',
                text: 'text.html',
                photo: 'photo.html',
                video: 'video.html',
                quote: 'quote.html',
                link: 'link.html',
                chat: 'chat.html',
                audio: 'audio.html',
                answer: 'answer.html'
            };

            var templateUrl = baseUrl + templateMap[contentType];
            templateLoader = $http.get(templateUrl, {cache: $templateCache});

            return templateLoader;

        }

        var linker = function(scope, element, attrs) {
            var loader = getTemplate(scope.item.type);
            
            var promise = loader.success(function(html) {
                element.html(html);
            }).then(function (response) {
                element.replaceWith($compile(element.html())(scope));
            });
        
        }

        return {
            restrict: 'E',
            scope: {
                item:'=data'
            },
            link: linker
        };
    }]);
