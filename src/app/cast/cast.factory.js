'use strict';
/**
 * @ngdoc service
 * @name cast.factory:CAST
 * @description
 *
 * Context and Abstract Syntax Tree.  The central datastructue of CodeStories. 
 It exposes a general path scheme for folder files and AST (of javascript files). 
 The project loader will setup this tree of CASTNodes and append Narrative data at the propper CASTNode. 
 The explorer allows a user to browse through the content , and the narrator will display the narratives of a 
 selected node in the CAST tree.
 */
angular.module('cast').factory('CAST', [
  'CASTNodeFactory',
  'NarrativeFactory',
  function (CASTNodeFactory, NarrativeFactory) {
    var EmptyCast = { 'rootnode': new CASTNodeFactory.RootNode('rootnode', {}) };
    return {
      /**
       * @ngdoc property
       * @name cast
       * @propertyOf cast.factory:CAST
       * @description
       * Contains the rootnode of the CAST. 
       */
      cast: EmptyCast,
      /**
       * @ngdoc property
       * @name selected
       * @propertyOf cast.factory:CAST
       * @description
       * Currently selected node in the CAST.
       */
      selected: EmptyCast.rootnode,
      /**
       * @ngdoc property
       * @name selectedPath
       * @propertyOf cast.factory:CAST
       * @description
       * Path to the currently selected node.
       */
      selectedPath: '/',
      /**
       * @ngdoc property
       * @name content
       * @propertyOf cast.factory:CAST
       * @description
       * Content of the file that this node corresponds to.
       */
      content: '',
      /**
       * @ngdoc property
       * @name project
       * @propertyOf cast.factory:CAST
       * @description
       * Root url of the project.
       */
      project: '',
      /**
       * @ngdoc property
       * @name narratives
       * @propertyOf cast.factory:CAST
       * @description
       * List of all narratives.
       */
      narratives: {},
      /**
       * @ngdoc method
       * @name appendNarrative
       * @methodOf cast.factory:CAST
       * @description
       * Takes narrative json and appends it to their CASTNodes when loading a project
       * @param {array} narratives Array of narratives to append.
       */
      reset: function () {
        var EmptyCast = { 'rootnode': new CASTNodeFactory.RootNode('rootnode', {}) };
        this.cast = EmptyCast;
        this.selected = EmptyCast.rootnode;
        this.selectedPath = '/';
        this.content = '';
        this.project = '';
        this.narratives = {};
        this.jsFiles = undefined;
      },
      appendNarrative: function (narratives) {
        var i, newNarrative, name;
        for (var castPath in narratives) {
          this.narratives[castPath] = this.narratives[castPath] || [];
          var narrative = narratives[castPath];
          for (i in narrative) {
            name = narrative[i].name;
            //hack: ASTNodes are only loaded once the filenode.getChild('program') has been called. 
            //  check if the path contains '/program' to determine if its an ast node
            if (castPath.toLowerCase().indexOf('.js/program') > 0) {
              newNarrative = new NarrativeFactory.CodeNarrative(name, castPath, narrative[i].narrativeHooks,narrative[i].dependencies);
              if(newNarrative.dependencies)
                newNarrative.dependencies = newNarrative.dependencies.map(this.cast.rootnode.getNode,this.cast.rootnode);
            } else {
              newNarrative = new NarrativeFactory.FSNarrative(name, castPath, narrative[i].items);
            }
            this.narratives[castPath].push(newNarrative);
          }
        }
      },
      //untested function to get list of related narratives at a node
      getRelatedNarratives: function (node) {
        var result = {
          'super': [],
          'sub': []
        };
        var path = this.selected.getPath();
        for (var n in this.narratives) {
          if (path !== n && this.narratives[n].length > 0) {
            if (path.indexOf(n) !== -1) {
              result.super.push(n);
            } else if (n.indexOf(path) !== -1) {
              result.sub.push(n);
            }
          }
        }
        function longestString(a, b) {
          return a.length - b.length;
        }
        result.super.sort(longestString);
        result.sub.sort(longestString);
        return result;
      },

      jsFiles : undefined,
      getJSFiles:function(){
        if(!this.jsFiles){
          this.jsFiles = this.cast.rootnode.getJSFiles();
        }
        return this.jsFiles;
      },
      /**
       * @ngdoc method
       * @name setSelected
       * @methodOf cast.factory:CAST
       * @description
       * Update the selected node. Will probably be replaced by State
       * @param {object} node Node to be selected.
       */
      setSelected: function (node) {
        if (typeof node === 'string') {
          this.selected = this.getNode(node);
        }
        if (node.isCASTNode) {
          this.selected = node;
        }
        this.selectedPath = this.selected.getPath();
      },
      /**
       * @ngdoc method
       * @name getNode
       * @methodOf cast.factory:CAST
       * @description
       * takes a path and returns a node
       * @returns {object} Corresponding node.
       * @param {string} path Path to node.
       */
      //TODO: Error message when not found
      getNode: function (path) {
        return this.cast.rootnode.getNode(path);
      },
      /**
       * @ngdoc method
       * @name getNode
       * @methodOf cast.factory:CAST
       * @description
       * takes a path and returns a node
       * @returns {array} Array of narratives.
       */
      getSelectedNarratives: function () {
       this.narratives[this.selectedPath] = this.narratives[this.selectedPath] || [];
        return this.narratives[this.selectedPath];
      },
      /**
       * @ngdoc method
       * @name getNarrative
       * @methodOf cast.factory:CAST
       * @description
       * gets a specific narrative at a path
       * @returns {object} corresponding node
       * @param {string} path Path to node.
       * @param {string} id Name of narrative.
       */
      getNarrative: function (path, id) {
        return this.narratives[path][id];
      },
      /**
       * @ngdoc method
       * @name getNarratives
       * @methodOf cast.factory:CAST
       * @description
       * Get all narratives at a path
       * @param {string} path Path to node.
       * @returns {array} Array of narratives.
       */
      getNarratives: function (path) {
        return this.narratives[path];
      },
      getFileAndLine:function ( path ){
        var node = this.cast.rootnode.getNode(path);
        if(node.isFile() || node.isFolder() ){
          return node.getPath();
        }
        else if (node.isASTNode()) {
          
          return node.getFile().getPath() + node.locationString();
        }
      }
    };
  }
]);