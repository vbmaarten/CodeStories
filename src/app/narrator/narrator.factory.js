'use strict';

/**
 * @ngdoc service
 * @name narrator.factory:narratorFactory
 * @requires cast.factory:CAST
 * @requires narrator.factory:interpreterFactory
 * @description
 *
 * Factory of the narrator, containers logic of the narrator like selecting, deselecting
 * and stepping through a narrative.
 */

 angular.module('narrator')
 .factory('narratorFactory',['$state', '$stateParams', 'CAST','interpreterFactory', 
  function ($state, $stateParams, CAST, interpreterFactory) {
  return {
      /**
       * @ngdoc property
       * @name narrativePlaying
       * @propertyOf narrator.factory:narratorFactory
       * @description
       * Tells the view mode if there is a narrative playing
       */ 
      narrativePlaying: false,

      /**
       * @ngdoc property
       * @name narrativeLink
       * @propertyOf narrator.factory:narratorFactory
       * @description
       * Boolean that records when a narrative is being linked. 
       * (Will be replaced by $state in the future.)
       */
       narrativeLink: false,
       /**
       * @ngdoc property
       * @name storyboard
       * @propertyOf narrator.factory:narratorFactory
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
       * @methodOf narrator.factory:narratorFactory
       * @description
       * First deselects a narrative if any narrative is still playing. Then sets the
       * current state to playing and pushes the given narrative on the queue.
       *
       * @param {object} narrative a narrative object to play.
       */     
      selectNarrative: function(narrative){
        this.deselectNarrative();
        this.narrativePlaying = true;
        this.pushNarrative(narrative);
        console.log('sibling')
        $state.go('^.playing');
      },

      /**
       * @ngdoc method
       * @name deselectNarrative
       * @methodOf narrator.factory:narratorFactory
       * @description
       * Deselects the current playing narrative. This empties the queue and sets
       * the playing state to false.
       */ 
      deselectNarrative: function(){
        this.narrativePlaying = false;
        this.queue.length = 0;
        this.queueCounter.length = 0;
        this.storyboard.length = 0;
        //$state.go('narrating.viewing.selecting',{},{'reload':true});
        $state.go('narrating.viewing.selecting');
      },

      pushNarrative: function(narrative){
        this.queue.unshift(narrative);
        this.queueCounter.unshift(0);
        this.storyboard.push({'name':this.queue[0].name, 'items':[]});
        if( narrative.isCodeNarrative() ){
          var CASTNode = CAST.getNode(narrative.CASTPath);
          interpreterFactory.setupNarratedAST(CASTNode,narrative);
        }
      },

      // debugStep:function(){
      //   var node = interpreterFactory.debugStep();
      //   console.log(node);
      // },

      getNextItem: function(){
        var nextItem;
        if(this.queue[0].isCodeNarrative()){
          var next = interpreterFactory.narrativeStep();
          nextItem = next;
        } 
        else {
          if(this.queue[0].items.length > this.queueCounter[0]){
            nextItem = this.queue[0].items[this.queueCounter[0]];
          } else {
            nextItem = false;
          }
        }
        return nextItem;
      },

      /**
       * @ngdoc method
       * @name step
       * @methodOf narrator.factory:narratorFactory
       * @description
       * Performs a narrative step. Adds an item to the storyboard if available.
       * Links to another narrative if an item is a link. If there is no more item
       * then it pops the narrative of the queue and continues with the next narrative
       * or halts playback.
       */ 
      step: function(){
        console.log($state.current); 


        var nextItem = this.getNextItem();

        if(!nextItem){
          // If the narrative is done playing
          this.popNarrative();
          return;

        }
        if( this.queue[0].isCodeNarrative() ){
          this.codeNarrativeStep(nextItem);
        }  else { // If the next item is a link to another narrative
          this.fsNarrativeStep(nextItem);
        }

      },

      fsNarrativeStep: function(next){
        if( next.isLinkItem() ){
          this.loadNarrative(next);
        }
        // Push the next item of the narrative
          else { 
            this.storyboard[this.storyboard.length-1].items.push(next);
            this.queueCounter[0]++;
          }

      },

      // Puts the next item of a code narrative on the storyboard
      codeNarrativeStep: function(next) {
        this.storyboard[this.storyboard.length-1].items.push(next.item);

        if(this.lastCodeNarrativeNode != next.node.getPath()){
          this.narrativeLink = true;
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
          this.narrativeLink = true;
          var path = this.queuePaths.shift();
          $state.go('narrating.viewing.playing', {'path': path});
        }
      },

      loadNarrative: function (linkItem) {
        // Set this value to true to let the controller know a narrative is playing
        this.narrativeLink = true;
        this.queueCounter[0]++;

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



