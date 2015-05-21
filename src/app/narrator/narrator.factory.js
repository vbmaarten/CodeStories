'use strict';

/**
 * @ngdoc function
 * @name narrator.factory:narrator
 * @description
 * # narratorFactory
 * Factory of the narrator, containers logic of the state of the narrator.
 */

angular.module('narrator')
  .factory('narratorFactory',['$state', 'CAST','interpreterFactory', function ($state, CAST, interpreterFactory) {
    return  {
      // Stores the current mode of the app
      writerMode: true,
      // Tells the view mode if there is a narrative playing
      narrativePlaying: false,
      // Stores the narratives that are currently playing
      queue: [],
      // Stores state of the narrative thats currently playing
      queueCounter: [],
      // Stores the paths to the queued up nodes
      queuePaths: [],
      // The currently displayed items of the playing narrative
      storyboard: [],
      // True if the there was a narrative linked
      narrativeLink: false,

      selectNarrative: function(narrative){
        this.deselectNarrative();
      	this.narrativePlaying = true;
      	this.pushNarrative(narrative);
      },

      deselectNarrative: function(){
        this.narrativePlaying = false;
        this.queue.length = 0;
        this.queueCounter.length = 0;
        this.storyboard.length = 0;
      },

      pushNarrative: function(narrative){
        this.queue.unshift(narrative);
        this.queueCounter.unshift(0);
        this.storyboard.push({'name':this.queue[0].name, 'items':[]});
        if(narrative.isCodeNarrative()){
          interpreterFactory.setupNarratedAST(CAST.getNode(narrative.CASTPath),narrative);
        }
      },

      debugStep:function(){
        var node = interpreterFactory.debugStep();
        console.log(node);
      },

      step: function(){
        var nextItem;

        // Get the next Item
        if(this.queue[0].isCodeNarrative()){
          nextItem = interpreterFactory.narrativeStep();
        } 
        else {
          if(this.queue[0].items.length > this.queueCounter[0]){
            nextItem = this.queue[0].items[this.queueCounter[0]];
          } else {
            nextItem = false;
          }
        }

        // If the narrative isnt done playing
        if(nextItem){            
          // If the next item is a link to another narrative
          if(nextItem instanceof LinkItem){
            this.loadNarrative(nextItem);
          } 
          // Push the next item of the narrative
          else { 
            this.storyboard[this.storyboard.length-1].items.push(nextItem);
            this.queueCounter[0]++;
          }
        }

        // If the narrative is done playing
        else{
          // Remove the first item from the queue
          this.queue.shift();
          this.queueCounter.shift();

          // If there are no more items left in the queue stop playing
          if(this.queue.length == 0){
            console.log('narrative done');
            this.deselectNarrative();
          }
          // Else continue with the queued up narrative
          else{
            this.storyboard.push({'name':this.queue[0].name, 'items':[]});
            this.narrativeLink = true;
            console.log('go back');
            $state.go('narrating.node.viewer', {'path': this.queuePaths.shift()});
          }
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

        console.log(linked);


        // Push the narrative on the stack and navigate to the node
        this.pushNarrative(linked);
        this.queuePaths.unshift(linkItem.content.node);
        $state.go('narrating.node.viewer', {'path': linkItem.content.node});
      }
    }
  }]);



