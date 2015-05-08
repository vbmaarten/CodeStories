angular.module('narrator')
.controller('PrimitiveController',function($scope){




  $scope.editorEnabled = false;

  $scope.edit = function() {
  	console.log($scope)
    $scope.editorEnabled = true;
    $scope.editableContent = $scope.$parent.primitive.text;
  };

  $scope.cancel = function() {
    $scope.editorEnabled = false;
  };

  $scope.save = function() {
    $scope.$parent.primitive.text = $scope.editableContent;
    $scope.cancel();
  };



}).directive('primitiveContent', ['$compile', '$http', '$templateCache', function($compile, $http, $templateCache) {

        var getTemplate = function(contentType) {
            var templateLoader,
            baseUrl = '/narrator/narrative/primitives/',
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