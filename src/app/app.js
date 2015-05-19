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
  .config(['$stateProvider', '$urlRouterProvider', '$urlMatcherFactoryProvider', function ($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {
    $urlRouterProvider
      .otherwise('/home/');

    (function() {
      function valToString(val) { return val !== null ? val.toString() : val; }//.replace("%252F", "").toString()
      function valFromString(val) { return val !== null ? val.toString(): val; }//.replace("%2F", "").toString()
      function regexpMatches(val) { /*jshint validthis:true */ return this.pattern.test(val); }
      $urlMatcherFactoryProvider.type('string', {
        encode: valFromString,
        decode: valFromString,
        is: regexpMatches,
        pattern: /[^/]*/
      });
    })();

    $stateProvider
      .state('narrating', {
        url: '/:project/{path:.*}',
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
  }]);

