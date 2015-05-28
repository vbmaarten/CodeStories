'use strict';

describe('Factory: Narrator', function() {
  beforeEach(module('codeStoriesApp'));
  beforeEach(module('cast'));
  beforeEach(module('narrator'));

  beforeEach(module(function ($provide) {
    $provide.value('interpreterFactory', {
        setupNarratedAST : function (CASTNode, narrative) {
          this.narrative = narrative;
        },
        narrativeStep : function() {
          return this.narrative.itemHooks['Body/0FunctionDeclaration/Block/Body/0VariableDeclaration'];
        }
    });
  }));

  beforeEach(module(function ($provide) {
    $provide.value('$state', {
      go : function (state, params) {
        this.state = state;
        this.params = params;
      }
    });
  }));

  var narrator;
  var CAST;
  var folderNode;
  var fileNode;
  var astNode;

  beforeEach(inject(function(_CAST_, _viewerFactory_){
    narrator = _viewerFactory_;
    CAST = _CAST_;
    folderNode = CAST.cast.rootnode.children['folderNode'] = new FolderNode('folderNode', CAST.cast.rootnode, {});
    fileNode = folderNode.children['fileNode.js'] = new FileNode('fileNode.js', folderNode, { });
    astNode = fileNode.children['program'] = new ASTNode('program', fileNode, {}, null);

    CAST.appendNarrative(narrativesMock);
  }));


  it('should start out with a default narrator object', function() {
    expect(narrator.narrativePlaying).toBe( false );
    expect(narrator.queue.length).toBe( 0 );
    expect(narrator.queueCounter.length).toBe( 0 );
    expect(narrator.queuePaths.length).toBe( 0 );
    expect(narrator.storyboard.length).toBe( 0 );
    expect(narrator.narrativeLink).toEqual( false );
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

  it('should be able to select a narrative for playing', function() {
    expect(narrator.narrativePlaying).toBe( false );
    narrator.selectNarrative(CAST.getNarrative('/folderNode', 0));
    expect(narrator.narrativePlaying).toBe( true );

  });

  it('should be able to deselect a narrative', function() {
    narrator.selectNarrative(CAST.getNarrative('/folderNode', 0));
    expect(narrator.narrativePlaying).toBe( true );
    expect(narrator.queue.length).toBe( 1 );

    narrator.deselectNarrative();
    expect(narrator.narrativePlaying).toBe( false );
    expect(narrator.queue.length).toBe( 0 );

  });

  it('should return the next item that should be shown to the user and false if there is no next item', function() {
    narrator.selectNarrative(CAST.getNarrative('/folderNode', 0));
    expect(narrator.getNextItem()).toBe(CAST.getNarrative('/folderNode',0).items[0]);

    narrator.queueCounter[0] = 4;

    expect(narrator.getNextItem()).toBe(false);

    narrator.selectNarrative(CAST.getNarrative('/folderNode/fileNode.js/program',0));

    // expect(narrator.getNextItem()).toBe(CAST.getNarrative('/folderNode/fileNode.js/program',0).itemHooks[0])

  });

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
      "content": {"id":"hello world narrative 2","node":"/folderNode/fileNode.js"}
    });

    expect(narrator.narrativeLink).toBe(true);
    expect($state.params.path).toBe("/folderNode/fileNode.js");
  }));

});


