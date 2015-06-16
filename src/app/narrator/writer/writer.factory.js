'use strict';

/**
 * @ngdoc service
 * @name narrator.factory:writerFactory
 * @requires cast.factory:CAST
 * @requires narrator.factory:interpreterFactory
 * @description
 *
 * Factory of the writer, containers logic of the writer like selecting, deselecting
 * creating new items and handling itemhooks.
 */

angular.module('narrator')
 .factory('writerFactory', ['$state', '$stateParams', 'CAST', 'NarrativeFactory',
  function ($state, $stateParams, CAST, NarrativeFactory) {
  return {

      selectedNarrative: undefined,

      stashed: undefined,

      /**
        * @ngdoc method
        * @name selectNarrative
        * @methodOf narrator.factory:writerFactory
        * @description
        * First deselects a narrative if any narrative is still editing. Then sets the
        * current state to editing and pushes the given narrative on the queue.
        *
        * @param {object} narrative a narrative object to play.
        */     
      selectNarrative: function(narrative){
        this.selectedNarrative = narrative;
        $state.go('narrating.writing.editing');
      },

      /**
        * @ngdoc method
        * @name deselectNarrative
        * @methodOf narrator.factory:writerFactory
        * @description
        * Deselects the current editing narrative. This empties the queue and sets
        * the editing state to false.
        */ 
      deselectNarrative: function(){
        if(this.selectedNarrative) {
          var path = this.selectedNarrative.CASTPath;
          this.selectedNarrative = undefined;
          $state.go('narrating.writing.selecting', {path: path});
        }
      },

      addDependency: function(dep){
        if(!this.selectedNarrative.dependencies){
          this.selectedNarrative.dependencies = []
        }
        this.removeDependency(dep);
        this.selectedNarrative.dependencies.push( dep );

      },

      removeDependency:function(dep){
        var i = this.selectedNarrative.dependencies.indexOf(dep) ;
        if(i !== -1)
          this.selectedNarrative.dependencies.splice( i ,1 )
      },

      moveStashed:function(targetPath){
        var target = this.selectedNarrative.getHookIndex(targetPath);
        if(this.stashed.type){ //hack , most likly a item
          this.selectedNarrative.addItem(targetPath,this.stashed);

        } else if ( this.stashed.path && this.stashed.items){
          //move whole narrativeHook  
            var hooks = this.selectedNarrative.narrativeHooks;
            if(target){
              hooks[target].items =  hooks[target].items.concat(this.stashed.items);
            }
            else {
              hooks[targetPath] = this.stashed;
              hooks[targetPath].path = targetPath;
              
            }

        }


        this.stashed = undefined;
        
      },

      /**
        * @ngdoc method
        * @name addNarrative
        * @methodOf narrator.factory:writerFactory
        * @description
        * Adds a new narrative to a given node.
        * 
        * @param {object} node a node of the ast to add a narrative to.
        */ 
      addNarrative : function (node) {
        var newNarrative;
        if(node.isASTNode()){
          newNarrative = new NarrativeFactory.CodeNarrative('New Narrative', CAST.selectedPath);
        }
        else{
          newNarrative = new NarrativeFactory.FSNarrative('New Narrative', CAST.selectedPath);
        }
        CAST.narratives[node.getPath()] = CAST.narratives[node.getPath()] || [];
        CAST.narratives[node.getPath()].push(newNarrative);
      }
    }
  }]);



