'use strict';
/**
 * @ngdoc directive
 * @name explorer.directive:directory
 * @scope
 * @restrict AE
 * @description
 * Recursive directive that contains a link to the corresponding node in the tree
 * and a list of its subnodes.
 */
angular.module('explorer').directive('directory', [
  'RecursionHelper',
  function (RecursionHelper) {
    return {
      restrict: 'A',
      scope: {
        data: '=',
        castUrl: '=',
        level: '='
      },
      templateUrl: '/explorer/directory/directory.html',
      controller:['$scope', 'CAST', function ($scope, CAST){
        $scope.contains = function (path){
          if(CAST.selectedPath.indexOf('.js/') !== -1)
            return (CAST.selectedPath.split('.js')[0] + '.js') == path;
          else 
            return path == CAST.selectedPath;
        }
        $scope.narrative = function (path){
          if (CAST.getNarratives(path))
            return CAST.getNarratives(path).length > 0;
          else 
            return false;
        }
      }],
      //Used to call directives recursively
      compile: function (element) {
        // Use the compile function from the RecursionHelper,
        // And return the linking function(s) which it returns
        return RecursionHelper.compile(element);
      }
    };
  }
]);