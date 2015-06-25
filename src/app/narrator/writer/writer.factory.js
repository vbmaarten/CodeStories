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
        $state.go('narrating.writing.editing.url', {path : $stateParams.path});
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
          $state.go('narrating.writing.selecting.url', {path: path});
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

      moveStashed:function(destination ){

      if( this.stashed.hook === destination){
        this.stashed = undefined;
        return;
      }
      var hooks = this.selectedNarrative.narrativeHooks ;
      var originHook = hooks[this.stashed.hook];


        if(this.stashed.item){ // move item 

          this.selectedNarrative.addItem(destination,this.stashed.item);

          originHook.items.splice( originHook.items.indexOf(this.stashed.item) , 1 );
          if( originHook.items.length === 0){
            delete hooks[this.stashed.hook];
          } 


        }  else {

            if( hooks[destination] ){
              hooks[destination].items =  hooks[destination].items.concat( originHook.items);
            }
            else {
              hooks[destination] = originHook ;
              hooks[destination].path = destination;

            }

            delete hooks[this.stashed.hook]
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
          var name = node.getBodyName();


          newNarrative = new NarrativeFactory.CodeNarrative('A ' + name + ' story', CAST.selectedPath);
        }
        else{

          newNarrative = new NarrativeFactory.FSNarrative('A ' + node.name + ' story', CAST.selectedPath);
        }
        CAST.narratives[node.getPath()] = CAST.narratives[node.getPath()] || [];
        CAST.narratives[node.getPath()].push(newNarrative);
        return newNarrative;
      }
    }
  }]);



