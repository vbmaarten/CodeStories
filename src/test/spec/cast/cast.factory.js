'use strict';

describe('Factory: CAST', function () {


  // load the controller's module
  beforeEach(module('cast'));

  var CASTNodeFactory;
  var CAST;
  var folderNode;
  var fileNode;
  var astNode;

  beforeEach(inject(function (_CAST_,_CASTNodeFactory_){
    CAST = _CAST_;
    CASTNodeFactory = _CASTNodeFactory_;
  }));

  it('should start of with an empty cast', function () {
    expect(CAST.cast).toEqual({'rootnode': new CASTNodeFactory.RootNode('rootnode', {})});
  });

  describe('node lookup', function () {

    beforeEach(function () {
      folderNode = CAST.cast.rootnode.children['folderNode'] = new CASTNodeFactory.FolderNode('folderNode', CAST.cast.rootnode, {});
      fileNode = folderNode.children['fileNode'] = new CASTNodeFactory.FileNode('fileNode', folderNode, { });
    });

    it('should return the root node on an empty path', function () {
      expect(CAST.getNode('')).toBe(CAST.cast.rootnode);
    });

    it('should return the corresponding node to a given path', function () {
      expect(CAST.getNode('folderNode')).toBe(folderNode);

      expect(CAST.getNode('folderNode/fileNode')).toBe(fileNode);
    });

    it('should throw an error on an incorrect path', function () {
      // TODO
    });

    it('should set the correct selected node', function () {
      
      CAST.setSelected('folderNode/fileNode');
      expect(CAST.selected).toBe(fileNode);

      CAST.setSelected(folderNode);
      expect(CAST.selected).toBe(folderNode);
    });


  });

  describe('narratives lookup', function() {



    beforeEach(function () {
      folderNode = CAST.cast.rootnode.children['folderNode'] = new CASTNodeFactory.FolderNode('folderNode', CAST.cast.rootnode, {});
      fileNode = folderNode.children['fileNode.js'] = new CASTNodeFactory.FileNode('fileNode.js', folderNode, { });
      astNode = fileNode.children['program'] = new CASTNodeFactory.ASTNode('program', fileNode, {}, null);
    });


    it('should be able to append a list of narratives', function () {
      CAST.appendNarrative(narrativesMock);

      expect(CAST.narratives['/folderNode'][0]['name']).toBe('hello world narrative');
      expect(CAST.getSelectedNarratives()).toEqual( [] );
    });

    it('should be able to return a selected narrative', function() {
      CAST.appendNarrative(narrativesMock);

      CAST.setSelected('folderNode/fileNode.js');

      expect(CAST.getSelectedNarratives()[0].name).toEqual( "hello world narrative 2" );
      expect(CAST.getNarratives('/folderNode')[0].name).toEqual( "hello world narrative" );
      expect(CAST.getNarrative('/folderNode/fileNode.js/program', 0).name).toEqual( "hello world narrative 3" );

    });


  });

});