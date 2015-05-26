'use strict';

describe('Factory: projectLoaderFactory', function () {   // Load your module.
  var projectLoaderFactory;

  beforeEach(module("cast")); 
  beforeEach(module("projectLoader"));

  beforeEach(inject(function (_projectLoaderFactory_){
    projectLoaderFactory = _projectLoaderFactory_;
  }));


  //Tests
  it('can get an instance of the factory', function(){
    expect(true).toBe(true);
  });

  it('generates proper FSNarrative objects', function(){
    var item1 = new TextItem('textitem');

    var fsNarrative = new FSNarrative('first_narrative', '/file1.js', [item1]);

    var generated = projectLoaderFactory._generateFSNarrative(fsNarrative);
    var expected = {name: 'first_narrative',
                    type: 'FS',
                    items: []};

    expect(generated.name).toEqual('first_narrative');
    expect(generated.type).toEqual('FS');
    expect(generated.items.length).toEqual(1);
  });

  it('generates proper text items', function(){
    var item = new TextItem("textitem");
    expect( projectLoaderFactory._generateItem(item) ).toEqual({type: 'text', content: 'textitem'});
  });

  it('generates proper link items', function(){    
    var item = new LinkItem({id: 'narrativeId', node: '/file.js'});
    expect( projectLoaderFactory._generateItem(item) ).toEqual({type: 'link', content: {id: 'narrativeId', node: '/file.js'}});
  });

  it('generates subdirectories while walking up to them', function(){
    var root = new FolderNode('', null, {});
    projectLoaderFactory._walkTo(root, ['test', 'test']);
    projectLoaderFactory._walkTo(root, ['test', 'test']);
  });

  it('generates a proper codestories object', function(){
    var narratives = {};
    var file1 = narratives["/file1.js"] = [];
    var file2 = narratives["/file2.js"] = [];

    var item1 = new LinkItem({id: "second_narrative", node: "/file2.js"});
    var item2 = new TextItem("textitem");

    file1.push(new FSNarrative("first_narrative", "/file1.js", [item1]));    
    file2.push(new FSNarrative("second_narrative", "/file2.js", [item2]));

    var codestories = projectLoaderFactory._generateCodeStories(narratives);
    var expected_codestories = {
      "/file1.js": [{
        "name": "first_narrative",
        "type": "FS",
        "items": [{
          "type": "link",
          "content": {"id": "second_narrative", "node":"/file2.js"}
          }
        ]
      }],
      "/file2.js": [{
        name: "second_narrative",
        type: "FS",
        items: [{
          "type": "text",
          "content": "textitem"
        }]
      }]
    }

    expect(codestories).toEqual(expected_codestories);
  });

  it('should unpack the right cast and narrative objects from a zip', function(){
    var zip = new JSZip();
    zip.folder('test').file('test.js', '');
    zip.file('.codestories', '{"/test/test.js": []}');

    var unpacked = projectLoaderFactory.UnpackZip(zip);
    var expectedCast = {};
    var expectedNarratives = {}

    expect(unpacked.cast).toBeDefined();
    expect(unpacked.narratives).toBeDefined();

    expect(unpacked.cast.children["test"]).toBeDefined();    
    expect(unpacked.cast.children["test"].children["test.js"]).toBeDefined();
    expect(unpacked.narratives).toEqual({"/test/test.js":[]});
  });

  it('should transform a cast to a zip', function(){
    var zip = new JSZip();
    var root = new FolderNode('/', null, {});

    root.children['folder'] = new FolderNode('folder', root, {})
    root.children['folder'].children['file.js'] = new FileNode('file.js', root.children['folder'], {}, "content")

    projectLoaderFactory._packCastZip(root, zip);

    expect(zip.files['folder/']).toBeDefined();
    expect(zip.files['folder/file.js']).toBeDefined();
  });
});