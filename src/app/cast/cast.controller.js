'use strict';

/**
 * @ngdoc function
 * @name cast.controller:CastCtrl
 * @description
 * # CastCtrl
 * Controller of the cast
 */
angular.module('cast')
  .controller('CastCtrl', ['$scope', '$stateParams', 'castFactory', function ($scope, $stateParams, castFactory) {
    $scope.directory = castFactory.cast;
    $scope.currentFile = "";
    if($stateParams.path) {
        var file = castFactory.getNode($stateParams.path);
        console.log(file);

        if(file.content){
        	$scope.currentFile = file.content;
        }
    }

    $scope.aceLoaded = function(_editor){
	    // Editor part
	    var _session = _editor.getSession();
	    var _renderer = _editor.renderer;

	    // Options
	    _editor.setReadOnly(true);
	    _session.setUndoManager(new ace.UndoManager());

	    // Events
	    //_editor.on("changeSession", function(){ ... });
	    //_session.on("change", function(){ ... });
	  };
  }]);
