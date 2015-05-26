'use strict';

/**
 * @ngdoc function
 * @name explorer.controller:ExplorerCtrl
 * @description
 * @requires cast.factory:CAST 
 * 
 * Provides functionality to the CAST Explorer
 */

angular.module('explorer')
  .controller('ExplorerCtrl', ['$scope', 'CAST', '$state', function ($scope, CAST,$state) {
    $scope.directory = CAST.cast;
    $scope.project = CAST.project;
    $scope.selected = CAST.selected;
    $scope.content = CAST.content;

    /**
    * @ngdoc method
    * @name getASTNodeByRange
    * @methodOf explorer.controller:ExplorerCtrl
    * @description
    * Determines the ASTNode at a given position
    *
    * @param {int} pos The position at which the closest AST Node has to be found
	* @return {ASTNode} The ASTNode that corresponds to the given position in the code
    */

    var getASTNodeByRange = function(pos){
      var ASTNode = $scope.selected;
      if(ASTNode.isFile())
      {
        ASTNode = ASTNode.getChild('Program');
      }
      var hasBetterSelection = true;
      while(!ASTNode.containsPosition(pos) && ASTNode.isASTNode()){
        ASTNode = ASTNode.parent;
      }

      while(hasBetterSelection){
        hasBetterSelection = false;
        var child, children = ASTNode.getChildren();
        for( child in children){
          if( children[child].containsPosition(pos) ){
            hasBetterSelection = true;
            ASTNode = children[child];
          }
        }
      }
      if(ASTNode.tnode instanceof Array)
        ASTNode = ASTNode.getParent()
      return ASTNode;
    }


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

	    var selectNode = function(e,selection){

		  var cursor = selection.getCursor();
		  var pos = _session.getDocument().positionToIndex(cursor,0);
		  var node =  getASTNodeByRange(pos);
		  //$state.go('narrating.node', {'path': node.getPath()});
		}; 
		_session.selection.on("changeCursor", selectNode);

	    // Node selection
	    if($scope.selected.isASTNode()){
	        var range = {};
	        range.start = {};
	        range.end = {};
	        range.start.row = $scope.selected.tnode.loc.start.line - 1;
	        range.start.column = $scope.selected.tnode.loc.start.column;
	        range.end.row = $scope.selected.tnode.loc.end.line - 1;
	        range.end.column = $scope.selected.tnode.loc.end.column;

	        _editor.getSession().selection.setSelectionRange(range);
    	}
	    // Events
	    //_editor.on("changeSession", function(){ ... });
	    //_session.on("change", function(){ ... });

	  };
  }]);
