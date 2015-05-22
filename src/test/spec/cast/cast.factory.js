'use strict';

describe('Factory: CAST', function () {


  // load the controller's module
  beforeEach(module('cast'));

  var CAST;
  var folderNode;
  var fileNode;

  beforeEach(inject(function (_CAST_){
    CAST = _CAST_;
  }));

  it('should start of with an empty cast', function () {
    expect(CAST.cast).toEqual({'rootnode': new RootNode('rootnode', {})});
  });

  describe('CAST node lookup and selection functionality', function () {

    beforeEach(function () {
      folderNode = CAST.cast.rootnode.children['folderNode'] = new FolderNode('folderNode', CAST.cast.rootnode, {});
      fileNode = folderNode.children['fileNode'] = new FileNode('fileNode', folderNode, { });
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


  describe('CAST narratives', function() {

    beforeEach(function () {
      folderNode = CAST.cast.rootnode.children['folderNode'] = new FolderNode('folderNode', CAST.cast.rootnode, {});
      fileNode = folderNode.children['fileNode'] = new FileNode('fileNode', folderNode, { });
    });

    var narratives = {
      '/folderNode': {
        "name": " hello world narrative",
        "type": "FS",
        "items": []
      },
      '/folderNode/FileNode': {
        "name": " hello world narrative 2",
        "type": "FS",
        "items": []
      },
    }

    it('should be able to append a list of narratives', function () {
      CAST.appendNarrative(narratives);
    });
  });

});