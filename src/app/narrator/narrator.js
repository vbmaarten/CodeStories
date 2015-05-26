'use strict';


/**
 * @ngdoc overview
 * @name narrator
 * @description
 * # narrator
 * Narrator module.
 */
angular.module('narrator', [])
  .config(function ($stateProvider) {
    $stateProvider
      .state('narrating.node.writer',{
        views: {
          'narratives': {
            templateUrl: '/narrator/writer/writer.html',
            controller: 'WriterCtrl' 
          },
        }
      })
      .state('narrating.node.viewer', {
        views: {
          'narratives': {
            templateUrl: '/narrator/viewer/viewer.html',
            controller: 'ViewerCtrl'
          },  
        }
      });
  });
