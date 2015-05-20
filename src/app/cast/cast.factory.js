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
            selected: undefined,
            // Path to the currently selected node
            selectePath: '',
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

                    var isASTNode = this.getNode(castPath).isASTNode();

                    this.narratives[castPath] = this.narratives[castPath] || {}


                    for (i in narratives) {
                        name = narratives[i].name;
                        if (isASTNode) {
                            newNarrative = new CodeNarrative(name, this, narratives[i].ASTItems);
                        } else {
                            newNarrative = new FSNarrative(name, this, narratives[i].items);

                        }

                        this.narratives[castPath][name] = newNarrative;
                    }
                }
            },

            // Return node that corresponds to the given path
            getNode: function(path) {
                return this.cast.rootnode.getNode(path);
            },

            getNarratives: function(path) {
                return this.narratives[path];
            }
        };
    });