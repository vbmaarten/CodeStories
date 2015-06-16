'use strict';

/**
 * @ngdoc directive
 * @name narrator.directive:emptyItem
 * @scope
 * @restrict AE
 * @description
 * Contains the item and its data, template changes depending on the type that
 * is passed along in the item object.
 * @param {object} item Item object.
 */
angular.module('narrator')
  .directive('emptyItem', ['ItemFactory' , function (ItemFactory) {
    return {
      restrict: 'AE',
      templateUrl: function (elem, attr) {
        return 'narrator/item/' + attr.type + '.html';
      },
      controller : ['$scope', function($scope){
        $scope.type = 'Select an item';
        $scope.types= [
          'Text',
          'Visualizations',
          'Code',
          'Video',
          'Image',
          'Narrative',
        ];

        $scope.changeToType = function (changeToType) {

          var index = $scope.node.items.indexOf($scope.item)
          switch(changeToType) {
            case 'Text':
              $scope.node.items[ index ] = new ItemFactory.TextItem();
              break;
            case 'Visualizations':
              $scope.node.items[ index ] = new ItemFactory.VCodeItem();
              break;
            case 'Video':
               $scope.node.items[ index ] = new ItemFactory.VideoItem();
              break;
             case 'Code':
               $scope.node.items[ index ] = new ItemFactory.CodeItem();
              break;
            case 'Image':
               $scope.node.items[ index ] = new ItemFactory.PictureItem();
              break;
            case 'Narrative':
               $scope.node.items[ index ] = new ItemFactory.LinkItem();
              break;
          }
        };
      }]
    }
  }]);