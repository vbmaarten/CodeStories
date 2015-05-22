'use strict';

describe('Factory: Narrator', function() {
  beforeEach(module('codeStoriesApp'));
  beforeEach(module('cast'));
  beforeEach(module('narrator'));

  beforeEach(module(function ($provide) {
    $provide.value('interpreterFactory', {
        setupNarratedAST : function (CASTNode, narrative) {}
    });
  }));

  var narrator;
  var CAST;
  var folderNode;
  var fileNode;
  var astNode;

  beforeEach(inject(function(_CAST_, _narratorFactory_){
    narrator = _narratorFactory_;
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

  it('should be able to push a narrative on the narrative stack', function(){
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



});