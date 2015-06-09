'use strict';


describe('Module: Narrator', function(){
  
  beforeEach(module('codeStoriesApp'));

  beforeEach(module(function ($provide) {
    $provide.value('$state', {
      state: undefined,
      go : function (state, params) {
        this.state = state;
        this.params = params;
      }
    });
  }));

  describe('Factory: Viewer', function() {

    beforeEach(module(function ($provide) {
      $provide.value('interpreterFactory', {
        debugStep: {},
        narrativeStep: {},
        setupNarratedAST : function (CASTNode, narrative) {
          this.narrative = narrative;
        },
        narrativeStep : function() {
          return this.narrativeStep;
        },
        reset : function() {},
        debugStep: function(){
          return this.debugStep;
        },
      });
    }));

    

    var narrator;
    var CAST;
    var folderNode;
    var fileNode;
    var astNode;
    var CASTNodeFactory

    beforeEach(inject(function(_CAST_,_CASTNodeFactory_, _viewerFactory_){
      CASTNodeFactory = _CASTNodeFactory_;
      narrator = _viewerFactory_;
      CAST = _CAST_;
      folderNode = CAST.cast.rootnode.children['folderNode'] = new CASTNodeFactory.FolderNode('folderNode', CAST.cast.rootnode, {});
      fileNode = folderNode.children['fileNode.js'] = new CASTNodeFactory.FileNode('fileNode.js', folderNode, { });
      astNode = fileNode.children['program'] = new CASTNodeFactory.ASTNode('program', fileNode, {}, null);

      CAST.appendNarrative(narrativesMock);
    }));


    it('should start out with a default viewer state', function() {
      expect(narrator.queue.length).toBe( 0 );
      expect(narrator.queueCounter.length).toBe( 0 );
      expect(narrator.queuePaths.length).toBe( 0 );
      expect(narrator.storyboard.length).toBe( 0 );
      expect(narrator.lastCodeNarrativeNode).toBe( "" );
    });

    it('should be able to push a narrative on the narrative queue', function(){
      narrator.pushNarrative(CAST.getNarrative('/folderNode', 0));
      expect(narrator.queue.length).toBe( 1 );
      expect(narrator.queue[0].name).toBe( narrativesMock['/folderNode'][0].name );
      expect(narrator.queueCounter[0]).toBe( 0 );
      expect(narrator.storyboard[0].name).toBe( narrativesMock['/folderNode'][0].name );

      narrator.pushNarrative(CAST.getNarrative('/folderNode/fileNode.js/program', 0));
      expect(narrator.queue.length).toBe( 2 );
    });

    it('should be able to select a narrative for playing', inject(function($state) {
      narrator.selectNarrative(CAST.getNarrative('/folderNode', 0));
      expect($state.state).toBe( 'narrating.viewing.playing' );
    }));

    it('should be able to deselect a narrative', inject(function($state) {
      narrator.selectNarrative(CAST.getNarrative('/folderNode', 0));
      expect(narrator.queue.length).toBe( 1 );
      expect($state.state).toBe( 'narrating.viewing.playing' );

      narrator.deselectNarrative();
      expect(narrator.queue.length).toBe( 0 );
      expect($state.state).toBe( 'narrating.viewing.selecting' );
    }));


    it('should be possible to pop an item from the narrative queue', inject(function($state){
      narrator.selectNarrative(CAST.getNarrative('/folderNode', 0));
      narrator.pushNarrative(CAST.getNarrative('/folderNode/fileNode.js', 0));
      narrator.queuePaths.push('somepath');
      expect(narrator.queue.length).toBe( 2 );

      narrator.popNarrative();
      expect(narrator.queue.length).toBe( 1 );
      expect($state.params.path).toBeDefined();

      narrator.popNarrative();
      expect(narrator.queue.length).toBe( 0 );
    }));

    it('should perform a narrative step, where it either adds an item or pops the narrative', function(){
      narrator.selectNarrative(CAST.getNarrative('/folderNode', 0));
      expect(narrator.storyboard.length).toBe( 1 );
      expect(narrator.storyboard[0].items.length).toBe( 0 );

      narrator.step();

      expect(narrator.storyboard[0].items.length).toBe( 1 );
    });

    it('should load a narrative from a narrative link', inject(function($state){
      expect($state.params).toBeUndefined();

      narrator.loadNarrative({
        "type": "link",
        "content": {"id":"hello world narrative 2","path":"/folderNode/fileNode.js"}
      });

      expect($state.params.path).toBe("/folderNode/fileNode.js");
    }));

    it('should perform a code narrative step, where it adds an item from a code narrative to the storyboard', inject(function(interpreterFactory, $state){
      expect(narrator.codeNarrativeStep()).toBe( false );

      narrator.pushNarrative(CAST.getNarrative('/folderNode/fileNode.js/program', 0));
      interpreterFactory.narrativeStep.item = interpreterFactory.narrative.narrativeHooks['/Body/0FunctionDeclaration/Block/Body/0VariableDeclaration'].items[0];
      interpreterFactory.narrativeStep.item.isVCodeItem = function(){return false};
      interpreterFactory.narrativeStep.item.isTextItem = function(){return false};
      interpreterFactory.narrativeStep.node = {getPath:function(){return '/folderNode/fileNode.js/program'}}

      expect(narrator.codeNarrativeStep()).toBe( true );
      expect(narrator.storyboard[0].items.length).toBe( 1 );
      expect($state.params['path']).toBe('/folderNode/fileNode.js/program');
    }));

    it('should perform a debugstep where it only advances one step in the interpreter', inject(function(interpreterFactory, $state){
      interpreterFactory.debugStep.node = {getPath:function(){return '/folderNode/fileNode.js/program'}}

      narrator.debugStep()

      expect($state.params['path']).toBe('/folderNode/fileNode.js/program');

    }));

  });


  describe('Factory: Writer', function() {

    var writer;
    var CAST;
    var folderNode;
    var fileNode;
    var astNode;
    var CASTNodeFactory;
    var $state;

    beforeEach(inject(function(_CAST_, _CASTNodeFactory_, _writerFactory_, _$state_){
      CASTNodeFactory = _CASTNodeFactory_;
      writer = _writerFactory_;
      CAST = _CAST_;
      folderNode = CAST.cast.rootnode.children['folderNode'] = new CASTNodeFactory.FolderNode('folderNode', CAST.cast.rootnode, {});
      fileNode = folderNode.children['fileNode.js'] = new CASTNodeFactory.FileNode('fileNode.js', folderNode, { });
      astNode = fileNode.children['program'] = new CASTNodeFactory.ASTNode('program', fileNode, {}, null);
      $state = _$state_;
      CAST.appendNarrative(narrativesMock);
    }));

    it('should select a narrative for editing', function() {
      expect(writer.selectedNarrative).toBeUndefined();
      writer.selectNarrative(CAST.getNarrative('/folderNode', 0));
      expect(writer.selectedNarrative).toBeDefined();
      expect($state.state).toBe('narrating.writing.editing');
    });

    it('should deselect a narrative that was selected', function () {
      expect(writer.selectedNarrative).toBeUndefined();
      writer.deselectNarrative();
      expect(writer.selectedNarrative).toBeUndefined();
      writer.selectNarrative(CAST.getNarrative('/folderNode', 0));
      expect(writer.selectedNarrative).toBeDefined();
      writer.deselectNarrative();
      expect(writer.selectedNarrative).toBeUndefined();
      expect($state.state).toBe('narrating.writing.selecting');
    });

    it('should add a new narrative to a passed node', function () {
      expect(CAST.narratives['/folderNode'].length).toBe( 1 );
      writer.addNarrative(CAST.getNode('/folderNode'));
      expect(CAST.narratives['/folderNode'].length).toBe( 2 );

      expect(CAST.narratives['/folderNode/fileNode.js/program'].length).toBe( 1 );
      writer.addNarrative(CAST.getNode('/folderNode/fileNode.js/program'));
      expect(CAST.narratives['/folderNode/fileNode.js/program'].length).toBe( 2 );
    });
  });

});

