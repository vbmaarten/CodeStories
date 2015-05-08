'use strict';

/**
 * @ngdoc function
 * @name explorer.controller:ExplorerCtrl
 * @description
 * # ExplorerCtrl
 * Controller of the explorer
 */
angular.module('explorer')
  .controller('ExplorerCtrl', ['$scope', '$stateParams', 'CAST', function ($scope, $stateParams, CAST) {
    $scope.directory = CAST.cast;
    $scope.currentFile = "";
    if($stateParams.path) {
        console.log($stateParams);
        var file = CAST.getNode($stateParams.path);
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
