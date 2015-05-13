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
      .state('narrating.writer',{
        views: {
          'narratives': {
            templateUrl: '/narrator//writer/writer.html',
            controller: 'WriterCtrl' 
          },       
        }
      })
      .state('narrating.viewer', {
        views: {
          'narratives': {
            templateUrl: '/narrator/viewer/viewer.html',
            controller: 'ViewerCtrl'
          },  
        }
      });
  });
