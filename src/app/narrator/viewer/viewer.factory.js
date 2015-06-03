'use strict';

/**
 * @ngdoc service
 * @name narrator.factory:viewerFactory
 * @requires cast.factory:CAST
 * @requires narrator.factory:interpreterFactory
 * @description
 *
 * Factory of the viewer, containers logic of the viewer like selecting, deselecting
 * and stepping through a narrative.
 */
 
 angular.module('narrator')
 .factory('viewerFactory',['$state', '$stateParams', 'CAST','interpreterFactory', 'vCodeInterpreterFactory' ,
  function ($state, $stateParams, CAST, interpreterFactory,vCodeInterpreterFactory) {
  return {

       /**
       * @ngdoc property
       * @name storyboard
       * @propertyOf narrator.factory:viewerFactory
       * @description
       * Array that contains she currently displayed items of the playing narrative
       */
      storyboard: [], 
      // Stores the narratives that are currently playing
      queue: [],
      // Stores state of the narrative thats currently playing
      queueCounter: [],
      // Stores the paths to the queued up nodes
      queuePaths: [],
      // The current node of a code narrative. (Will be replaced by $state in the future.)
      lastCodeNarrativeNode: "",

      /**
       * @ngdoc method
       * @name selectNarrative
       * @methodOf narrator.factory:viewerFactory
       * @description
       * First deselects a narrative if any narrative is still playing. Then sets the
       * current state to playing and pushes the given narrative on the queue.
       *
       * @param {object} narrative a narrative object to play.
       */     
      selectNarrative: function(narrative){
        this.deselectNarrative();
        this.pushNarrative(narrative);
        $state.go('^.playing');
      },

      /**
       * @ngdoc method
       * @name deselectNarrative
       * @methodOf narrator.factory:viewerFactory
       * @description
       * Deselects the current playing narrative. This empties the queue and sets
       * the playing state to false.
       */ 
      deselectNarrative: function(){
        this.queue.length = 0;
        this.queueCounter.length = 0;
        this.storyboard.length = 0;
        $state.go('narrating.viewing.selecting');
      },

      pushNarrative: function(narrative){
        this.queue.unshift(narrative);
        this.queueCounter.unshift(0);
        this.storyboard.push({'name':this.queue[0].name, 'items':[]});
        if( narrative.isCodeNarrative() ){
          var CASTNode = CAST.getNode(narrative.CASTPath);
          interpreterFactory.setupNarratedAST(CASTNode,narrative);
          vCodeInterpreterFactory.startSession();
        }
      },

      // debugStep:function(){
      //   var node = interpreterFactory.debugStep();
      //   console.log(node);
      // },

      getNextItem: function(){
        var nextItem = false;
        if(this.queue[0].isCodeNarrative()){
          nextItem = interpreterFactory.narrativeStep();
        } 
        else {
          if(this.queue[0].items.length > this.queueCounter[0]){
            nextItem = this.queue[0].items[this.queueCounter[0]];
          }
        }
        return nextItem;
      },

      /**
       * @ngdoc method
       * @name step
       * @methodOf narrator.factory:viewerFactory
       * @description
       * Performs a narrative step. Adds an item to the storyboard if available.
       * Links to another narrative if an item is a link. If there is no more item
       * then it pops the narrative of the queue and continues with the next narrative
       * or halts playback.
       */ 
      step: function(){
        var nextItem = this.getNextItem();

        if(!nextItem){
          this.popNarrative();
        }
        else {
          if( this.queue[0].isCodeNarrative() ){
            this.codeNarrativeStep(nextItem);
          } else {
            this.fsNarrativeStep(nextItem);
          }
        }
      },

      fsNarrativeStep: function(next){
        this.queueCounter[0]++;
        if( next.isLinkItem() ) {
          this.loadNarrative(next);
        }
        else { 
          this.storyboard[this.storyboard.length-1].items.push(next);
        }
      },

      codeNarrativeStep: function(next) {
        var item = next.item;

        if(item.isVCodeItem()){
          item = new VCodeItem(item.content); 
          var interpreterScope = interpreterFactory.getCurrentScope() ;
          vCodeInterpreterFactory.runVCode( item , interpreterScope);
        }

        this.storyboard[this.storyboard.length-1].items.push(item);




        if(this.lastCodeNarrativeNode != next.node.getPath()){
          this.lastCodeNarrativeNode = next.node.getPath();
          $state.go('narrating.viewing.playing', {'path': next.node.getPath()});
        }
        this.lastCodeNarrativeNode = next.node.getPath();
      },

      popNarrative: function() {
        // Remove the first item from the queue
        this.queue.shift();
        this.queueCounter.shift();

        // If there are no more items left in the queue stop playing
        if(this.queue.length == 0){
          this.deselectNarrative();
        }
        // Else continue with the queued up narrative
        else{
          this.storyboard.push({'name':this.queue[0].name, 'items':[]});
          $state.go('narrating.viewing.playing', {'path': this.queuePaths.shift()});
        }
      },

      loadNarrative: function (linkItem) {
        // Get the node of the narrative that is linked to and find the narrative
        var node = CAST.getNode(linkItem.content.node);
        var narratives = CAST.getNarratives(linkItem.content.node);
        var linked;

        for (var index in narratives) {
          if (narratives[index].name == linkItem.content.id){
            linked = narratives[index];
          }
        }

        if(linked === undefined){
          linked = node.isASTNode() ? 
          new CodeNarrative('A new narrative appears',linkItem.content.node ) : new FSNarrative('A new narrative appears',linkItem.content.node);
        } 
        this.queuePaths.unshift($stateParams.path);

        // Push the narrative on the stack and navigate to the node
        this.pushNarrative(linked);

        $state.go('narrating.viewing.playing', {'path': linkItem.content.node});
      }
    }
  }]);



