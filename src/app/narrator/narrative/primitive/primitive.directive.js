'use strict';

/**
 * @ngdoc function
 * @name narrator.directive:primitive
 * @description
 * # primitive
 * Diretive of the primitive
 */
angular.module('narrator')
  .directive('primitive', function () {
    return {
      templateUrl:'narrator/narrative/primitive/primitive.html',
      controller:'PrimitiveCtrl'
    }
  }).directive('addPrimitiveBtn',function(){
    return {
      template:  "<div ng-show='writerMode' class='narrator-btn' ng-click='addPrimitive(narrative,primitive);'>+</div>",  
    };
  }).directive('removePrimitiveBtn',function(){
  return {
      template:  "<div ng-show='writerMode' class='narrator-btn' ng-click='removePrimitive(narrative,primitive);'>-</div>", 
    };
  })
  .directive('primitiveContent', ['$compile', '$http', '$templateCache', function($compile, $http, $templateCache) {

        var getTemplate = function(contentType) {
            var templateLoader,
            baseUrl = '/narrator/narrative/primitive/',
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
            var loader = getTemplate(scope.primitive.type);
            
            var promise = loader.success(function(html) {
                element.html(html);
            }).then(function (response) {
                element.replaceWith($compile(element.html())(scope));
            });
        
        }

        return {
            restrict: 'E',
            scope: {
                primitive:'=data'
            },
            link: linker
        };
    }]);
