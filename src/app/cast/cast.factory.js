'use strict';

/**
 * @ngdoc function
 * @name cast.factory:CAST
 * @description
 * # CAST
 * Factory of the cast
 */

var CastMock = {
    'rootnode': new FolderNode('rootnode', null, {})
};

angular.module('cast')
    .factory('CAST', function() {

        return {
            // CAST object
            cast: CastMock,
            // Currently selected node in the CAST
            selected: CastMock.rootnode,
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
                        if (!castPath.indexOf('/program') > 0) {
                            newNarrative = new CodeNarrative(name, castPath, narrative[i].ASTItems);
                        } else {
                            newNarrative = new FSNarrative(name, castPath, narrative[i].items);
                        }

                        this.narratives[castPath].push(newNarrative );
                    }
                }
            },

            setSelected:function(node){
              if(typeof node === 'string'){
                
                this.selected = this.getNode(node);
              } else if ( node instanceof CASTNode){
                this.selected = node;
              }
               this.selectedPath = this.selected.getPath();
            },

            // Return node that corresponds to the given path
            getNode: function(path) {
                return this.cast.rootnode.getNode(path);
            },

            getSelectedNarratives: function(){
               this.narratives[this.selectedPath] = this.narratives[this.selectedPath] || [];
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