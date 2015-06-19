'use strict';
/**
 * @ngdoc overview
 * @name codeStoriesApp
 * @description
 * # codeStoriesApp
 *
 * Main module of the application.
 */
angular.module('codeStoriesApp', [
  'ngAnimate',
  'ngCookies',
  'ngRoute',
  'ngSanitize',
  'ui.router',
  'projectManager',
  'cast',
  'narrator',
  'explorer',
  'VCodeInterpreter',
  'VObjectEditor',
  'notifications',
  'navigation',
  'VisualElements'
]).config([
  '$stateProvider',
  '$urlRouterProvider',
  '$urlMatcherFactoryProvider',
  function ($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {
    (function () {
      function valToString(val) {
        return val !== null ? val.toString() : val;
      }
      //.replace("%252F", "").toString()
      function valFromString(val) {
        return val !== null ? val.toString() : val;
      }
      //.replace("%2F", "").toString()
      function regexpMatches(val) {
        /*jshint validthis:true */
        return this.pattern.test(val);
      }
      $urlMatcherFactoryProvider.type('string', {
        encode: valFromString,
        decode: valFromString,
        is: regexpMatches,
        pattern: /[^/]*/
      });
    }());
    var resolveCASTObj = {
      resolveCAST: [
        '$rootScope',
        '$state',
        '$stateParams',
        '$http',
        'CAST',
        'projectManagerFactory',
        'notificationsFactory',
        function ($rootScope, $state, $stateParams, $http, CAST, projectManagerFactory,notificationsFactory) {
          var setPath = function () {
            if (CAST.selectedPath !== $stateParams.path) {
              CAST.setSelected($stateParams.path);
              if (CAST.selected.isASTNode()) {
                var parent = CAST.selected.getParent();
                while (!parent.content) {
                  parent = parent.getParent();
                }
                CAST.content = parent.content;
              } else if (CAST.selected.isFile()) {
                CAST.content = CAST.selected.content;
              } else {
                CAST.content = 'This is a folder';
              }
            }
          };
          if (CAST.project !== $stateParams.project) {
            if ($stateParams.project.startsWith('github:')) {
              var params = $stateParams.project.split(':');
              projectManagerFactory.loadGitHub(params[1], params[2], function () {
                notificationsFactory.success('Git project loaded!');
                $state.go('narrating.viewing.selecting.url', { 'project': $stateParams.project }, { reload: true });
              });
            } else if ($stateParams.project.endsWith('.zip')) {
              return $http({
                url: '/stories/' + $stateParams.project,
                method: 'GET',
                responseType: 'arraybuffer'
              }).success(function (data) {
                projectManagerFactory.loadZip(data);
                CAST.project = $stateParams.project;
                notificationsFactory.success('Zip project loaded!');
                setPath();
                $state.go('narrating.viewing.selecting.url', { 'project': $stateParams.project }, { reload: true });
              }).error(function () {
                console.error('project not found');
                $state.go('home');
              });
            }
          } else {
            setPath();
          }
          $rootScope.$broadcast('castEvent');
        }
      ]
    };
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('home', {
      url: '/',
      views: {
        'app': {
          templateUrl: '/homeScreen/homeScreen.html',
          controller: 'HomeScreenCtrl'
        }
      }
    }).state('narrating', {
      url: '/:project',
      abstract: true,
      views: {
        'app': { 
          templateUrl: 'app.html' 
        },
        'navigation@narrating': {
          templateUrl: '/navigation/navigation.html',
          controller: 'navigationCtrl'
        },
        'explorer@narrating': { 
          templateUrl: '/explorer/explorer.html' 
        }
      }
    }).state('narrating.viewing', {
      abstract: true,
      views: {
        'code': { 
          controller: 'CodeCtrl' 
        },
        'directories': { 
          controller: 'DirectoriesCtrl' 
        },
        'narrator': {
          templateUrl: '/narrator/narrator.html',
          controller: 'NarratorCtrl'
        },
        'narratives@narrating.viewing': {
          templateUrl: '/narrator/viewer/viewer.html',
          controller: 'ViewerCtrl'
        }
      }
    }).state('narrating.viewing.playing', {
      abstract: true,
      views: { 
        'viewer': { 
          templateUrl: '/narrator/viewer/viewer.play.html' 
        } 
      }
    }).state('narrating.viewing.selecting', {
      abstract: true,
      views: { 
        'viewer': { 
          templateUrl: '/narrator/viewer/viewer.select.html' 
        } 
      }
    }).state('narrating.writing', {
      abstract: true,
      views: {
        'code': { 
          controller: 'CodeCtrl' 
        },
        'directories': { 
          controller: 'DirectoriesCtrl' 
        },
        'narrator': {
          templateUrl: '/narrator/narrator.html',
          controller: 'NarratorCtrl'
        },
        'narratives@narrating.writing': {
          templateUrl: '/narrator/writer/writer.html',
          controller: 'WriterCtrl'
        }
      }
    }).state('narrating.writing.editing', {
      abstract: true,
      views: { 
        'writer': { 
          templateUrl: '/narrator/writer/writer.edit.html' 
        } 
      } 
    }).state('narrating.writing.selecting', {
      abstract: true,
      views: { 
        'writer': { 
          templateUrl: '/narrator/writer/writer.select.html' 
        } 
      }
    }).state('narrating.viewing.playing.url', {
      resolve: resolveCASTObj,
      url: '{path:.*}',
    }).state('narrating.viewing.selecting.url', {
      resolve: resolveCASTObj,
      url: '{path:.*}',
    }).state('narrating.writing.editing.url', {
      resolve: resolveCASTObj,
      url: '{path:.*}',
    }).state('narrating.writing.selecting.url', {
      resolve: resolveCASTObj,
      url: '{path:.*}',
    });
  }
]).run([
  '$rootScope',
  '$state',
  '$stateParams',
  function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.editorLoaded = false;
    
  }
]);