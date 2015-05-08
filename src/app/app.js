'use strict';

/**
 * @ngdoc overview
 * @name codeStoriesApp
 * @description
 * # codeStoriesApp
 *
 * Main module of the application.
 */
angular
  .module('codeStoriesApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ui.router',
    'projectLoader',
    'cast',
    'narrator',
    'explorer'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/');


    $stateProvider
      .state('home',{
        url: '/',
        views: {
          'projectLoader': {
            templateUrl: '/projectLoader/projectLoader.html',
            controller: 'ProjectLoaderCtrl' 
          },
          'explorer': {
            templateUrl: '/explorer/explorer.html',
            controller: 'ExplorerCtrl'
          },
          'narrator': {
            templateUrl: '/narrator/narrator.html',
            controller: 'NarratorCtrl' 
          }          
        }
      })
      .state('file', {
        url: '/dir/*path',
        views: {
          'projectLoader': {
            templateUrl: '/projectLoader/projectLoader.html',
            controller: 'ProjectLoaderCtrl' 
          },
          'explorer': {
            templateUrl: '/explorer/explorer.html',
            controller: 'ExplorerCtrl'
          },
          'narrator': {
            templateUrl: '/narrator/narrator.html',
            controller: 'NarratorCtrl' 
          }    
        }
      });
  });

