'use strict';
/**
 * @ngdoc controller
 * @name explorer.controller:CodeCtrl
 * @description
 * @requires cast.factory:CAST 
 * @requires narrator.factory:writerFactory 
 * @requires narrator.factory:viewerFactory 
 * 
 * Provides functionality to the CAST Explorer
 */
angular.module('explorer').controller('CodeCtrl', [
  '$scope',
  '$state',
  '$timeout',
  'CAST',
  'writerFactory',
  'viewerFactory',
  function ($scope, $state, $timeout, CAST, writerFactory, viewerFactory) {
    $scope.selected = CAST.selected;
    $scope.content = CAST.content;
    // bug in ace editor, giving multiple events.
    $timeout(function () {
      $scope.editorLoaded = true;
    }, 100);

    $scope.$on('castEvent', function (event){
      $scope.editorLoaded = false;
      console.log('castEvent');
      $scope.selected = CAST.selected;
      $scope.content = CAST.content;
      $scope.loadContent();
      $timeout(function () {
        $scope.editorLoaded = true;
      }, 100);
    });

    /**
    * @ngdoc method
    * @name getASTNodeByRange
    * @methodOf explorer.controller:CodeCtrl
    * @description
    * Determines the node at a given position
    *
    * @param {int} pos The position at which the closest AST Node has to be found
	  * @return {ASTNode} The node that corresponds to the given position in the code
    */
    var getASTNodeByRange = function (pos) {
      var node = $scope.selected;
      if (node.isFile()) {
        node = node.getChild('Program');
      }
      var hasBetterSelection = true;
      while (node.isASTNode() && !node.containsPosition(pos)) {
        node = node.parent;
      }
      while (hasBetterSelection) {
        hasBetterSelection = false;
        var child, children = node.getChildren();
        for (child in children) {
          if (children[child].containsPosition(pos)) {
            hasBetterSelection = true;
            node = children[child];
          }
        }
      }
      if (node.tnode instanceof Array){
        node = node.getParent();
      }
      return node;
    };
    var getRange = function (node) {
      var range = {};
      range.start = {};
      range.end = {};
      range.start.row = node.tnode.loc.start.line - 1;
      range.start.column = node.tnode.loc.start.column;
      range.end.row = node.tnode.loc.end.line - 1;
      range.end.column = node.tnode.loc.end.column;
      return range;
    };

    $scope.aceLoaded = function (_editor) {
      console.log('aceloaded');
      // Editor part
      var _session = _editor.getSession();
      var _renderer = _editor.renderer;
      _editor.$blockScrolling = Infinity;
      var Range = ace.require('ace/range').Range;
      // Options
      _editor.setReadOnly(true);
      //mark a node with a classname marker
      var mark = function (node, marker) {
        var range = getRange(node);
        var newrange = new Range(range.start.row, range.start.column, range.end.row, range.end.column);
        _session.addMarker(newrange, marker, 'line', false);
      };


      var selectNode = function (e, selection) {
        // if statement to handle bug in changeCursor event of ace editor
        if ($scope.editorLoaded && ( $scope.selected.isJSFile() || $scope.selected.isASTNode() ) ) {
          $scope.editorLoaded = false;
          var cursor = selection.getCursor();
          var pos = _session.getDocument().positionToIndex(cursor, 0);
          var node = getASTNodeByRange(pos);
          console.log("cursor " + pos)
          console.log("go to " + node.getPath() )
          $state.go('.', { 'path': node.getPath() });
        }
      };
      _session.selection.on('changeCursor', selectNode);

      $scope.loadContent = function () {
        _editor.setValue($scope.content, -1);

        // Removing old markers
        var markers = _session.getMarkers();
        for(var i in markers) {
          _session.removeMarker(i);
        }

        // Marking nodes of interrest
        var narrativeNode
        if ($scope.selected.isASTNode()) {
          mark($scope.selected, 'selected-node');

          //_editor.centerSelection()

          _editor.scrollToRow($scope.selected.tnode.loc.start.line - 1,true,true);
          if (writerFactory.selectedNarrative && $state.is('narrating.writing.editing')) {
            narrativeNode = CAST.getNode(writerFactory.selectedNarrative.CASTPath);
            mark(narrativeNode, 'selected-narrative');
            for (var hook in writerFactory.selectedNarrative.narrativeHooks) {
              var hookPath = writerFactory.selectedNarrative.narrativeHooks[hook].path;
              mark(narrativeNode.getNode(hookPath), 'selected-item-hook');
            }
          }
          if ($state.is('narrating.viewing.playing') && viewerFactory.queue[0]  && viewerFactory.queue[0].isCodeNarrative()) {
            narrativeNode = CAST.getNode(viewerFactory.queue[0].CASTPath);
            mark(narrativeNode, 'selected-narrative');
          }
        }
      }
      $scope.loadContent();
    }; 
  }
]);