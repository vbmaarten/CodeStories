'use strict';

/**
 * @ngdoc function
 * @name explorer.controller:ExplorerCtrl
 * @description
 * @requires cast.factory:CAST 
 * 
 * Provides functionality to the CAST Explorer
 */

var aceRange = ace.define.modules['ace/range'].Range
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
    * Determines the node at a given position
    *
    * @param {int} pos The position at which the closest AST Node has to be found
	* @return {ASTNode} The node that corresponds to the given position in the code
    */

    var getASTNodeByRange = function(pos){
      var node = $scope.selected;
      if(node.isFile())
      {
        node = node.getChild('Program');
      }
      var hasBetterSelection = true;
      while(!node.containsPosition(pos) && node.isASTNode()){
        node = node.parent;
      }

      while(hasBetterSelection){
        hasBetterSelection = false;
        var child, children = node.getChildren();
        for( child in children){
          if( children[child].containsPosition(pos) ){
            hasBetterSelection = true;
            node = children[child];
          }
        }
      }
      if(node.tnode instanceof Array)
        node = node.getParent()

      console.log(node);
      console.trace();
      return node;
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
		  $state.go('.' , {'path': node.getPath()});
		}; 
		_session.selection.on("changeCursor", selectNode);

	    if($scope.selected.isASTNode()){
	        var range = {};
	        range.start = {};
	        range.end = {};
	        range.start.row = $scope.selected.tnode.loc.start.line - 1;
	        range.start.column = $scope.selected.tnode.loc.start.column;
	        range.end.row = $scope.selected.tnode.loc.end.line - 1;
	        range.end.column = $scope.selected.tnode.loc.end.column;
          var newRange =  new aceRange(range.start.row, range.start.column, range.end.row, range.end.column);
          var marker =  _session.addMarker(newRange,"higlight-ace","background");
    	}

	  };
  }]);
