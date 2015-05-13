'use strict';


/**
 * @ngdoc function
 * @name narrator.module
 * @description
 * # narrator
 * Narrator module
 */
angular.module('narrator', [])
  .config(function ($stateProvider) {
    $stateProvider
      .state('writer',{
        views: {
          'narratives': {
            templateUrl: '/writer/writer.html',
            controller: 'WriterCtrl' 
          },       
        }
      })
      .state('viewer', {
        views: {
          'narratives': {
            templateUrl: '/viewer/viewer.html',
            controller: 'ViewerCtrl'
          },  
        }
      });
  });
