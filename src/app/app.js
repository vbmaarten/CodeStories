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
    'ngRoute',
    'ngSanitize',
    'ui.router',
    'projectManager',
    'cast',
    'narrator',
    'explorer',
    'VCodeInterpreter',
    'VObjectEditor',
    'messaging',
    'navigation' 
  ])
  .config(['$stateProvider', '$urlRouterProvider', '$urlMatcherFactoryProvider',
    function ($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {
    

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


    var resolveCASTObj = {
      resolveCAST : ['$state', '$stateParams', '$http', 'CAST', 'projectManagerFactory', 
        function($state, $stateParams, $http, CAST, projectManagerFactory){

          var setPath = function () {
            if (CAST.selectedPath !== $stateParams.path) {
              CAST.setSelected($stateParams.path);

              if(CAST.selected.isASTNode()){
                var parent = CAST.selected.getParent();
                while (!parent.content){
                  parent = parent.getParent();
                }
                CAST.content = parent.content;
              } else if(CAST.selected.isFile()){
                CAST.content = CAST.selected.content;
              } else {
                CAST.content = "This is a folder";
              }
            }
          }

          if (CAST.project !== $stateParams.project) {
            if($stateParams.project.startsWith('github:')){
              var params = $stateParams.project.split(':');
              projectManagerFactory.loadGitHub(params[1],params[2],function(){
                $state.go('narrating.viewing.selecting',{'project': $stateParams.project}, {reload:true});
              })
            }
            else if ($stateParams.project.endsWith('.zip')) {
              return $http({
                url: '/stories/' + $stateParams.project,
                method: 'GET',
                responseType: 'arraybuffer'
              }).success(function (data) {
                projectManagerFactory.loadZip(data);
                CAST.project = $stateParams.project;
                setPath();
                return $http.get('/stories/' + $stateParams.project + '.json').success(function(data){
                  CAST.appendNarrative(data);
                })
              }).error(function () {
                console.error('project not found');
                $state.go('home');
              });
            }
          }
          else {
            setPath();
          }
        }
      ]
    }


    $urlRouterProvider
      .otherwise('/');

    $stateProvider
      .state('home',{
        url: '/',
        views: {
          'app': {
            templateUrl: '/homeScreen/homeScreen.html',
            controller:'HomeScreenCtrl'
          }
        }
      })
      .state('narrating', {
        url: '/:project',
        abstract: true,
        views: {
          'app': {
            templateUrl: 'app.html',
          },          
          'navigation@narrating': {
            templateUrl: '/navigation/navigation.html',
            controller: 'navigationCtrl'
          }
        }
      })
      .state('narrating.viewing', {
        url: '{path:.*}',
        resolve: resolveCASTObj,
        abstract: true,
        views: {
          'directories': {
            controller: 'DirectoriesCtrl'
          },
          'code': {
            controller: 'CodeCtrl'
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
      })
      .state('narrating.viewing.playing', {
        views: {
          'viewer': {
            templateUrl: '/narrator/viewer/viewer.play.html'
          }
        }
      })
      .state('narrating.viewing.selecting', {
        url:'',
        views: {
          'viewer': {
            templateUrl: '/narrator/viewer/viewer.select.html'
          }
        }
      })
      .state('narrating.writing', {
        url: '{path:.*}',
        resolve: resolveCASTObj,
        abstract: true,
        views: {
          'directories': {
            controller: 'DirectoriesCtrl'
          },
          'code': {
            controller: 'CodeCtrl'
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
      })
      .state('narrating.writing.editing', {
        views: {
          'writer': {
            templateUrl: '/narrator/writer/writer.edit.html'
          }
        }
      })
      .state('narrating.writing.selecting', {
        url:'',
        views: {
          'writer': {
            templateUrl: '/narrator/writer/writer.select.html'
          }
        }
      })
  }])
  .run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.editorLoaded = false;
  }]);;

