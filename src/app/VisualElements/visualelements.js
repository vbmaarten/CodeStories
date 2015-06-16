angular.module("VisualElements", []);

angular.module('VisualElements').directive('showFocus', function($timeout) {
  return function(scope, element, attrs) {
    scope.$watch(attrs.showFocus, 
      function (newValue) { 
        $timeout(function() {
        	console.log(element);
            newValue && element[0].focus();
        });
      },true);
  };    
});