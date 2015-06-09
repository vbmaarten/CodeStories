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
        castUrl: '='
      },
      templateUrl: '/explorer/directory/directory.html',
      //Used to call directives recursively
      compile: function (element) {
        // Use the compile function from the RecursionHelper,
        // And return the linking function(s) which it returns
        return RecursionHelper.compile(element);
      }
    };
  }
]);