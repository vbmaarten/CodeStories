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

  describe('node lookup', function () {

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

  describe('narratives lookup', function() {



    beforeEach(function () {
      folderNode = CAST.cast.rootnode.children['folderNode'] = new FolderNode('folderNode', CAST.cast.rootnode, {});
      fileNode = folderNode.children['fileNode.js'] = new FileNode('fileNode.js', folderNode, { });
      ASTNode = fileNode.children['program'] = new ASTNode('program', fileNode, {}, null);
    });

    var narratives = {
      '/folderNode': [
        {
          "name": "hello world narrative",
          "type": "FS",
          "items": []
        }
      ],
      '/folderNode/fileNode.js': [
        {
          "name": "hello world narrative 2",
          "type": "FS",
          "items": []
        }
      ],
      '/folderNode/fileNode.js/program': [
        {
          "name": "hello world narrative 3",
          "type": "Code",
          "ASTItems": []
        }
      ]
    }

    it('should be able to append a list of narratives and be able to return a selected narrative', function () {
      CAST.appendNarrative(narratives);

      expect(CAST.narratives['/folderNode'][0]['name']).toBe('hello world narrative');
      expect(CAST.getSelectedNarratives()).toEqual( [] );

      CAST.setSelected('folderNode/fileNode.js');

      expect(CAST.getSelectedNarratives()[0].name).toEqual( "hello world narrative 2" );
      expect(CAST.getNarratives('/folderNode')[0].name).toEqual( "hello world narrative" );
      expect(CAST.getNarrative('/folderNode/fileNode.js/program', 0).name).toEqual( "hello world narrative 3" );

    });


  });

});