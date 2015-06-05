// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-05-06 using
// generator-karma 0.9.0

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'bower_components/angular/angular.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-ui-ace/ui-ace.js',
      'bower_components/d3/d3.js',
      'bower_components/angular-scroll-glue/src/scrollglue.js',
      'bower_components/angular-mocks/angular-mocks.js',
      // endbower
      'app/libs/interpreter.js',
      'app/libs/**.js',
      'app/app.js',

      'app/cast/cast.js',
      'app/explorer/explorer.js',
      'app/narrator/narrator.js',
      
      'app/narrator/item/ItemFactory.js',
      'app/narrator/NarrativeFactory.js',
      'app/cast/CASTNodeFactory.js',
      
      'app/cast/cast.factory.js',
      'app/projectManager/projectManager.js',
      'app/narrator/interpreter/interpreter.factory.js',      
      
      'app/VCode/vcodeinterpreter.js',
      'app/VObjectEditor/VObjectEditor.js',
      'app/messaging/messaging.js',
      'app/navigation/navigation.js',
      'app/{,*/}*.js',
      'test/mock/{,*/}*.js',
      'test/spec/{,*/}*.js'
    ],


    preprocessors : {
      'app/narrator/item/ItemFactory.js': 'coverage',
      'app/cast/cast.factory.js': 'coverage',
      'app/cast/CASTNodeFactory.js': 'coverage',
      'app/narrator/NarrativeFactory.js': 'coverage',
      'app/projectManager/projectManager.factory.js': 'coverage',
      'app/narrator/viewer/viewer.factory.js': 'coverage',
      'app/narrator/writer/writer.controller.js': 'coverage',
      'app/narrator/interpreter/interpreter.factory.js': 'coverage',
      'app/explorer/explorer.controller.js': 'coverage',
      'app/VCode/vcodeinterpreter.factory.js': 'coverage',
    },

    // coverage reporter generates the coverage
    reporters: ['progress', 'coverage'],

    // optionally, configure the reporter
    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },

    // list of files / patterns to exclude
    exclude: [
      'app/stories/*',
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
    ],

    // Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-coverage',
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
