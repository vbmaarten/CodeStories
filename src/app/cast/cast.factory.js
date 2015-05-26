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



angular.module('cast')
    .factory('CAST', function() {

        var EmptyCast = {
            'rootnode': new RootNode('rootnode', {})
        };

        return {
             /**
           * @ngdoc property
           * @name cast
           * @propertyOf cast.factory:CAST
           * @description
           * contains the rootnode of the CAST. 
           */ 
            cast: EmptyCast,
                         /**
           * @ngdoc property
           * @name selected
           * @propertyOf cast.factory:CAST
           * @description
           * Currently selected node in the CAST
           */ 
        
            selected: EmptyCast.rootnode,

                  /**
           * @ngdoc property
           * @name selectedPath
           * @propertyOf cast.factory:CAST
           * @description
           * Path to the currently selected node
           */             
            
            selectedPath: '/',

        
            content: '',

                              /**
           * @ngdoc property
           * @name project
           * @propertyOf cast.factory:CAST
           * @description
           * Root url
           */ 
            
            project: '',

                              /**
           * @ngdoc property
           * @name narratives
           * @propertyOf cast.factory:CAST
           * @description
           * narrative list
           */ 
            
            narratives: {},

      /**
       * @ngdoc method
       * @name appendNarrative
       * @methodOf cast.factory:CAST
       * @description
       * Takes narrative json and appends it to their CASTNodes when loading a project
       */ 
            appendNarrative: function(narratives) {
                var i, newNarrative, name;
                for (var castPath in narratives) {
                    this.narratives[castPath] = this.narratives[castPath] || [];

                    var narrative = narratives[castPath];
                    for (i in narrative) {
                        name = narrative[i].name;
                        //hack: ASTNodes are only loaded once the filenode.getChild('program') has been called. 
                        //  check if the path contains '/program' to determine if its an ast node
                        if ( castPath.toLowerCase().indexOf('.js/program') > 0) {
                            newNarrative = new CodeNarrative(name, castPath, narrative[i].itemHooks);
                        } else {
                            newNarrative = new FSNarrative(name, castPath, narrative[i].items);
                        }

                        this.narratives[castPath].push(newNarrative );
                    }
                }
            },
            

        /**
       * @ngdoc method
       * @name setSelected
       * @methodOf cast.factory:CAST
       * @description
       * Update the selected node. Will probably be replaced by State 
       */ 
            setSelected:function(node){
              if (typeof node === 'string'){
                this.selected = this.getNode(node);
              }
              if ( node instanceof CASTNode){
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
       */ 
            getNode: function(path) {
                return this.cast.rootnode.getNode(path);
            },

            getSelectedNarratives: function(){
              return  this.narratives[this.selectedPath] || [];
            },

             /**
               * @ngdoc method
               * @name getNarrative
               * @methodOf cast.factory:CAST
               * @description
               * gets a specific narrative at a path 
               */ 
            getNarrative:function(path,id){
                return this.narratives[path][id];

            },

             /**
       * @ngdoc method
       * @name getNarratives
       * @methodOf cast.factory:CAST
       * @description
       * get all narratives at a path
       */ 
            getNarratives: function(path) {
                return this.narratives[path];
            }
        };
    });