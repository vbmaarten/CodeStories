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
            'cast': {
              templateUrl: '/cast/cast.html',
              controller: 'CastCtrl'
            },
            'narrator': {
              templateUrl: '/narrator/narrator.html',
              controller: 'NarratorCtrl' 
            },
          }
        });
  });

