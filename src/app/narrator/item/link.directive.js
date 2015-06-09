'use strict';
/**
 * @ngdoc directive
 * @name narrator.directive:linkItem
 * @scope
 * @restrict AE
 * @description
 * Contains the item and its data, template changes depending on the type that
 * is passed along in the item object.
 * @param {object} item Item object.
 */
angular.module('narrator').directive('linkItem', function () {
  return {
    restrict: 'AE',
    templateUrl: function (elem, attr) {
      return 'narrator/item/' + attr.type + '.html';
    },
    controller: [
      '$scope',
      'CAST',
      function ($scope, CAST) {
        var nodes = CAST.narratives;
        var narratives = {};
        if ($scope.item.content == 'Empty') {
          $scope.item.content = {};
        }
        $scope.link = $scope.item.content.path + ' - ' + $scope.item.content.id;
        for (var i in nodes) {
          for (var j in nodes[i]) {
            var narrative = nodes[i][j];
            narratives[i + ' - ' + narrative.name] = nodes[i][j];
          }
        }
        $scope.narratives = narratives;
        $scope.changeLink = function (link) {
          var narToLink = narratives[link];
          $scope.item.content.id = narToLink.name;
          $scope.item.content.path = narToLink.CASTPath;
        };
      }
    ]
  };
});