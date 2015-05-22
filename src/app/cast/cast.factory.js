'use strict';

/**
 * @ngdoc function
 * @name cast.factory:CAST
 * @description
 * # CAST
 * Factory of the cast
 */



angular.module('cast')
    .factory('CAST', function() {

        var EmptyCast = {
            'rootnode': new RootNode('rootnode', {})
        };

        return {
            // CAST object
            cast: EmptyCast,
            // Currently selected node in the CAST
            selected: EmptyCast.rootnode,
            // Path to the currently selected node
            selectedPath: '/',
            // File content corresponding to the current node
            content: '',
            // Root url
            project: '',
            //narrative list
            narratives: {},

            // Appends narratives 
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
            getASTNodeByRange: function(pos){
                var ASTNode = this.selected;
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
            },

            setSelected:function(node){
              if (typeof node === 'string'){
                this.selected = this.getNode(node);
              }
              if ( node instanceof CASTNode){
                this.selected = node;
              }
               this.selectedPath = this.selected.getPath();
            },

            // Return node that corresponds to the given path
            getNode: function(path) {
                return this.cast.rootnode.getNode(path);
            },

            getSelectedNarratives: function(){
              return  this.narratives[this.selectedPath];
            },

            getNarrative:function(path,id){
                return this.narratives[path][id];

            },

            getNarratives: function(path) {
                return this.narratives[path];
            }
        };
    });