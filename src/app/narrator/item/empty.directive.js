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
          'Audio',
          'Visualizations',
          'Code',
          'Video',
          'Image',
          'Narrative',
        ];

        $scope.changeToType = function (changeToType) {
          var list = $scope.selectedNarrative.items || $scope.node.items;
          var index = list.indexOf($scope.item);
          var newItem;
          switch(changeToType) {
            case 'Audio':
              newItem = new ItemFactory.AudioItem();
              break;
            case 'Text':
              newItem = new ItemFactory.TextItem();
              break;
            case 'Visualizations':
              newItem = new ItemFactory.VCodeItem();
              break;
            case 'Video':
               newItem = new ItemFactory.VideoItem();
              break;
             case 'Code':
               newItem = new ItemFactory.CodeItem();
              break;
            case 'Image':
               newItem = new ItemFactory.PictureItem();
              break;
            case 'Narrative':
               newItem = new ItemFactory.LinkItem();
              break;
          }
          list[index] = newItem;
        };
      }]
    }
  }]);
