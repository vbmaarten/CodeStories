'use strict';

describe('Factory: projectManagerFactory', function () {   // L

  var projectManagerFactory;

  beforeEach(module("codeStoriesApp")); 

  var CASTNodeFactory;

  beforeEach(inject(function (_projectManagerFactory_,_CASTNodeFactory_){
    projectManagerFactory = _projectManagerFactory_;
    CASTNodeFactory = _CASTNodeFactory_;
  }));


  //Tests
  it('can get an instance of the factory', function(){
    expect(true).toBe(true);
  });

  it('generates proper NarrativeFactory.FSNarrative objects', function(){
    var item1 = new TextItem('textitem');

    var fsNarrative = new NarrativeFactory.FSNarrative('first_narrative', '/file1.js', [item1]);

    var generated = projectManagerFactory._generateFSNarrative(fsNarrative);
    var expected = {name: 'first_narrative',
                    type: 'FS',
                    items: []};

    expect(generated.name).toEqual('first_narrative');
    expect(generated.type).toEqual('FS');
    expect(generated.items.length).toEqual(1);
  });

  it('generates proper text items', function(){
    var item = new TextItem("textitem");
    expect( projectManagerFactory._generateItem(item) ).toEqual({type: 'text', content: 'textitem'});
  });

  it('generates proper link items', function(){    
    var item = new LinkItem({id: 'narrativeId', node: '/file.js'});
    expect( projectManagerFactory._generateItem(item) ).toEqual({type: 'link', content: {id: 'narrativeId', node: '/file.js'}});
  });

  it('generates subdirectories while walking up to them', function(){
    var root = new CASTNodeFactory.FolderNode('', null, {});
    projectManagerFactory._walkTo(root, ['test', 'test']);
    projectManagerFactory._walkTo(root, ['test', 'test']);
  });

  it('generates a proper codestories object', function(){
    var narratives = {};
    var file1 = narratives["/file1.js"] = [];
    var file2 = narratives["/file2.js"] = [];

    var item1 = new LinkItem({id: "second_narrative", node: "/file2.js"});
    var item2 = new TextItem("textitem");

    file1.push(new NarrativeFactory.FSNarrative("first_narrative", "/file1.js", [item1]));    
    file2.push(new NarrativeFactory.FSNarrative("second_narrative", "/file2.js", [item2]));

    var codestories = projectManagerFactory._generateCodeStories(narratives);
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

    var unpacked = projectManagerFactory.UnpackZip(zip);
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
    var root = new CASTNodeFactory.FolderNode('/', null, {});

    root.children['folder'] = new CASTNodeFactory.FolderNode('folder', root, {})
    root.children['folder'].children['file.js'] = new CASTNodeFactory.FileNode('file.js', root.children['folder'], {}, "content")

    projectManagerFactory._packCastZip(root, zip);

    expect(zip.files['folder/']).toBeDefined();
    expect(zip.files['folder/file.js']).toBeDefined();
  });
});