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
	    if($scope.selected)
	    	if($scope.selected.name.split(".").pop() == "js"){
	   	 		_session.setMode("ace/mode/javascript");
	   		} else {
	   		 _session.setMode("ace/mode/text");
	   	}
	    _editor.setTheme("ace/theme/crimson_editor");
	    _editor.setValue($scope.content, -1);

	    // Node selection
	    if($scope.selected.isASTNode()){
	        var range = {};
	        range.start = {};
	        range.end = {};
	        range.start.row = $scope.selected.ast.loc.start.line - 1;
	        range.start.column = $scope.selected.ast.loc.start.column;
	        range.end.row = $scope.selected.ast.loc.end.line - 1;
	        range.end.column = $scope.selected.ast.loc.end.column;

	        _editor.getSession().selection.setSelectionRange(range);
    	}
	    // Events
	    //_editor.on("changeSession", function(){ ... });
	    //_session.on("change", function(){ ... });

	  };
  }]);
