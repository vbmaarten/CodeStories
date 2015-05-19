'use strict';

/**
 * @ngdoc function
 * @name explorer.controller:ExplorerCtrl
 * @description
 * # ExplorerCtrl
 * Controller of the explorer
 */
angular.module('explorer')
  .controller('ExplorerCtrl', ['$scope', 'CAST', function ($scope, CAST) {
    $scope.directory = CAST.cast;
    $scope.project = CAST.project;
    $scope.selected = CAST.selected;
    $scope.content = CAST.content;

    

    $scope.aceLoaded = function(_editor){
	    // Editor part
	    var _session = _editor.getSession();
	    var _renderer = _editor.renderer;

	    // Options
	    _editor.setReadOnly(true);
	    _session.setUndoManager(new ace.UndoManager());
	    _session.setMode("ace/mode/javascript");
	    _editor.setTheme("ace/theme/crimson_editor");

	    // Node selection
	    if($scope.selected.isASTNode()) {

	    }

	    // Events
	    //_editor.on("changeSession", function(){ ... });
	    //_session.on("change", function(){ ... });

	  };
  }]);
