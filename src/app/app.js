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
    'narrator'
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
            'cast': {
              templateUrl: '/cast/cast.html',
              controller: 'CastCtrl'
            },
            'narrator': {
              templateUrl: '/narrator/narrator.html',
              controller: 'NarratorCtrl' 
            }          }
        });
  });

