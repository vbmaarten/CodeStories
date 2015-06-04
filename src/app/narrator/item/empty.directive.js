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
          'Video',
          'Image',
          'Narrative',
        ];

        $scope.changeToType = function (changeToType) {

          switch(changeToType) {
            case 'Text':
              $scope.item.__proto__ = Object.create(ItemFactory.TextItem.prototype);
              $scope.item.type = 'text';
              break;
            case 'Visualizations':
              $scope.item.__proto__ = Object.create(ItemFactory.VCodeItem.prototype);
              $scope.item.type = 'vcode';
              break;
            case 'Video':
              $scope.item.__proto__ = Object.create(ItemFactory.VideoItem.prototype);
              $scope.item.type = 'video';
              break;
            case 'Image':
              $scope.item.__proto__ = Object.create(ItemFactory.PictureItem.prototype);
              $scope.item.type = 'picture';
              break;
            case 'Narrative':
              $scope.item.__proto__ = Object.create(ItemFactory.LinkItem.prototype);
              $scope.item.type = 'link';
              break;
          }
        };
      }]
    }
  }]);