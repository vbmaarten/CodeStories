'use strict';

describe('Factory: projectManagerFactory', function () { 
  var projectManagerFactory;

  var github = {
    limit: 60,
    remaining: 60
  };

  var csBlobElement = {
    "path": ".codestories",
    "mode": "100644",
    "type": "blob",
    "sha": "192c823ebfc603dc5aeb22f5414c64d52e7540a1",
    "size": 2997,
    "url": "https://api.github.com/repos/vbmaarten/bubble/git/blobs/192c823ebfc603dc5aeb22f5414c64d52e7540a1"
  }

  var jsBlobElement = {
    "path": "bubblesort.js",
    "mode": "100644",
    "type": "blob",
    "sha": "6b01c4688a21fe7666c535c94c707ac2bc66112b",
    "size": 352,
    "url": "https://api.github.com/repos/vbmaarten/bubble/git/blobs/6b01c4688a21fe7666c535c94c707ac2bc66112b"
  }

  var treeElement = {
    "path": "sort_algorithms",
    "mode": "040000",
    "type": "tree",
    "sha": "f5e2eb061b980a4d226d33c9b5f8c45c04767898",
    "url": "https://api.github.com/repos/vbmaarten/bubble/git/trees/f5e2eb061b980a4d226d33c9b5f8c45c04767898"
  }

  var codeStoriesBlob = {
    "sha": "192c823ebfc603dc5aeb22f5414c64d52e7540a1",
    "size": 2997,
    "url": "https://api.github.com/repos/vbmaarten/bubble/git/blobs/192c823ebfc603dc5aeb22f5414c64d52e7540a1",
    "content": "ewogICAgIi9yZWFkbWUubWQiOiBbCiAgICAgICAgewogICAgICAgICAgICAi\nbmFtZSI6ICIgaGVsbG8gd29ybGQgbmFycmF0aXZlIiwKICAgICAgICAgICAg\nInR5cGUiOiAiRlMiLAogICAgICAgICAgICAiaXRlbXMiOiBbCiAgICAgICAg\nICAgICAgICB7CiAgICAgICAgICAgICAgICAgICAgInR5cGUiOiAidGV4dCIs\nCiAgICAgICAgICAgICAgICAgICAgImNvbnRlbnQiOiAiSGVsbG8gV29ybGQh\nIgogICAgICAgICAgICAgICAgfSwKICAgICAgICAgICAgICAgIHsKICAgICAg\nICAgICAgICAgICAgICAidHlwZSI6ICJ0ZXh0IiwKICAgICAgICAgICAgICAg\nICAgICAiY29udGVudCI6ICJUaGlzaXNhc3RvcnlhbGxhYm91dGhvdy4uLi4i\nCiAgICAgICAgICAgICAgICB9LAogICAgICAgICAgICAgICAgewogICAgICAg\nICAgICAgICAgICAgICJ0eXBlIjogImxpbmsiLAogICAgICAgICAgICAgICAg\nICAgICJjb250ZW50IjogeyJpZCI6ImNvZGUgbGluayIsInBhdGgiOiIvc29y\ndF9hbGdvcml0aG1zL2J1YmJsZXNvcnQuanMifQogICAgICAgICAgICAgICAg\nfSwKICAgICAgICAgICAgICAgIHsKICAgICAgICAgICAgICAgICAgICAidHlw\nZSI6ICJsaW5rIiwKICAgICAgICAgICAgICAgICAgICAiY29udGVudCI6IHsi\naWQiOiJidWJibGUgbmFycmF0aXZlIiwicGF0aCI6Ii9maWJvbmFjY2kuanMi\nfQogICAgICAgICAgICAgICAgfSwKICAgICAgICAgICAgICAgIHsKICAgICAg\nICAgICAgICAgICAgICAidHlwZSI6ICJ0ZXh0IiwKICAgICAgICAgICAgICAg\nICAgICAiY29udGVudCI6ICIgRklOICIKICAgICAgICAgICAgICAgIH0KICAg\nICAgICAgICAgXQogICAgICAgIH0KICAgIF0sCiAgICAiL3NvcnRfYWxnb3Jp\ndGhtcy9idWJibGVzb3J0LmpzIiA6IFsKICAgICAgICAgICAgewogICAgICAg\nICAgICAgICAgIm5hbWUiOiAiY29kZSBsaW5rIiwKICAgICAgICAgICAgICAg\nICJ0eXBlIjogIkZTIiwKICAgICAgICAgICAgICAgICJpdGVtcyI6IFsKICAg\nICAgICAgICAgICAgICAgICB7CiAgICAgICAgICAgICAgICAgICAgICAgICJ0\neXBlIjogInRleHQiLAogICAgICAgICAgICAgICAgICAgICAgICAiY29udGVu\ndCI6ICJBIGJ1YmJsZSBzb3J0IHByb2dyYW0iCiAgICAgICAgICAgICAgICAg\nICAgfSwKICAgICAgICAgICAgICAgICAgICB7CiAgICAgICAgICAgICAgICAg\nICAgICAgICJ0eXBlIjogInRleHQiLAogICAgICAgICAgICAgICAgICAgICAg\nICAiY29udGVudCI6ICJMZXRzIHNlZSBpdCBpbiBhY3Rpb24gIgogICAgICAg\nICAgICAgICAgICAgIH0sCiAgICAgICAgICAgICAgICAgICAgewogICAgICAg\nICAgICAgICAgICAgICJ0eXBlIjogImxpbmsiLAogICAgICAgICAgICAgICAg\nICAgICJjb250ZW50IjogeyJpZCI6ImNvZGV0ZXN0MiIsInBhdGgiOiIvc29y\ndF9hbGdvcml0aG1zL2J1YmJsZXNvcnQuanMvUHJvZ3JhbSJ9CiAgICAgICAg\nICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgXQogICAgICAgICAgICB9\nCiAgICAgICAgXSwKICAgICIvc29ydF9hbGdvcml0aG1zL2J1YmJsZXNvcnQu\nanMvUHJvZ3JhbSI6WwogICAgICAgIHsKICAgICAgICAgICAgIm5hbWUiOiJj\nb2RldGVzdDIiLAogICAgICAgICAgICAidHlwZSI6IkNvZGUiLAogICAgICAg\nICAgICAibmFycmF0aXZlSG9va3MiOnsKICAgICAgICAgICAgICAgICJib2R5\nLzAvYm9keS9ib2R5LzAiOnsKICAgICAgICAgICAgICAgICAgICAicGF0aCI6\nImJvZHkvMC9ib2R5L2JvZHkvMCIsCiAgICAgICAgICAgICAgICAgICAgICJp\ndGVtcyI6WwoKICAgICAgICAgICAgICAgICAgICAgICAgeyJ0eXBlIjoidGV4\ndCIsCiAgICAgICAgICAgICAgICAgICAgICAgICJjb250ZW50IjoiSGVyZSB3\nZSBzZXQgdGhlIGxlbmd0aCIKICAgICAgICAgICAgICAgICAgICAgfSwKICAg\nICAgICAgICAgICAgICAgICAgIHsidHlwZSI6InZjb2RlIiwKICAgICAgICAg\nICAgICAgICAgICAgICAgImNvbnRlbnQiOiJ2YXIgYmFyY2hhcnQgPSBuZXcg\nQmFyQ2hhcnQodmFsdWVzKTsgXG4gZGlzcGxheShiYXJjaGFydC5kb21FbCk7\nICJ9CgogICAgICAgICAgICAgICAgICAgIF19LAogICAgICAgICAgICAgICAg\nImJvZHkvMC9ib2R5L2JvZHkvMS9ib2R5L2JvZHkvMS9ib2R5L2JvZHkvMC90\nZXN0Ijp7CiAgICAgICAgICAgICAgICAicGF0aCI6ImJvZHkvMC9ib2R5L2Jv\nZHkvMS9ib2R5L2JvZHkvMS9ib2R5L2JvZHkvMC90ZXN0IiwKICAgICAgICAg\nICAgICAgICAiaXRlbXMiOlsKICAgICAgICAgICAgICAgICAgICB7InR5cGUi\nOiJ0ZXh0IiwKICAgICAgICAgICAgICAgICAgICAiY29udGVudCI6IkhlcmUg\naXQgY2hlY2tzIGlmIGl0IHNob3VsZCBzd2FwIHRoZXNlIHZhbHVlcyIKICAg\nICAgICAgICAgICAgICB9LAogICAgICAgICAgICAgICAgICB7InR5cGUiOiJ2\nY29kZSIsCiAgICAgICAgICAgICAgICAgICAgImNvbnRlbnQiOiJiYXJjaGFy\ndC5oaWdobGlnaHQoW2ksaSsxXSwnZ3JleScpOyJ9CiAgICAgICAgICAgICAg\nICAgICAgXQogICAgICAgICAgICAgICAgfSwKICAgICAgICAgICAgICAgICJi\nIjp7CiAgICAgICAgICAgICAgICAicGF0aCI6ImJvZHkvMC9ib2R5L2JvZHkv\nMS9ib2R5L2JvZHkvMS9ib2R5L2JvZHkvMC9jb25zZXF1ZW50L2JvZHkvMyIs\nCiAgICAgICAgICAgICAgICAgIml0ZW1zIjpbCiAgICAgICAgICAgICAgICAg\nICAgeyJ0eXBlIjoidGV4dCIsCiAgICAgICAgICAgICAgICAgICAgImNvbnRl\nbnQiOiIgVGhlc2Ugc2hvdWxkIGJlIHN3YXBwZWQgLiBTbyBsZXRzIHN3YXAi\nCiAgICAgICAgICAgICAgICAgfSwKICAgICAgICAgICAgICAgICAgeyJ0eXBl\nIjoidmNvZGUiLAogICAgICAgICAgICAgICAgICAgICJjb250ZW50IjoiIGJh\ncmNoYXJ0LmhpZ2hsaWdodChbaSxpKzFdLCdibHVlJyk7IFxuIGJhcmNoYXJ0\nLnVwZGF0ZSh2YWx1ZXMpOyBkaXNwbGF5KGJhcmNoYXJ0LmRvbUVsKTsgIn0K\nICAgICAgICAgICAgICAgICAgICBdCiAgICAgICAgICAgICAgICB9CiAgICAg\nICAgICAgIH0KICAgICAgICB9CiAgICBdCn0K\n",
    "encoding": "base64"
  }

  var jsBlob = {
    "sha": "6b01c4688a21fe7666c535c94c707ac2bc66112b",
    "size": 352,
    "url": "https://api.github.com/repos/vbmaarten/bubble/git/blobs/6b01c4688a21fe7666c535c94c707ac2bc66112b",
    "content": "ZnVuY3Rpb24gc29ydCh2YWx1ZXMpIHsKICB2YXIgbGVuZ3RoID0gdmFsdWVz\nLmxlbmd0aCAtIDE7CiAgZG8gewogICAgdmFyIHN3YXBwZWQgPSBmYWxzZTsK\nICAgIGZvcih2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkgewogICAgICBp\nZiAodmFsdWVzW2ldID4gdmFsdWVzW2krMV0pIHsKICAgICAgICB2YXIgdGVt\ncCA9IHZhbHVlc1tpXTsKICAgICAgICB2YWx1ZXNbaV0gPSB2YWx1ZXNbaSsx\nXTsKICAgICAgICB2YWx1ZXNbaSsxXSA9IHRlbXA7CiAgICAgICAgc3dhcHBl\nZCA9IHRydWU7CiAgICAgIH0KICAgIH0KICB9CiAgd2hpbGUoc3dhcHBlZCA9\nPSB0cnVlKQp9Owpzb3J0KFs3LCA0LCA1LCAyLCA5LCAxXSk7Cg==\n",
    "encoding": "base64"
  }  

  beforeEach(module('notifications'));

  beforeEach(module(function ($provide) {
    $provide.value('notificationsFactory', {
        error: function(notification){}
    });
  }));

  beforeEach(module(function ($provide) {
    github.limit = 60;
    github.remaining = 60

    $provide.value('$http', {
        get: function(url){
          if(url == "https://api.github.com/rate_limit"){
            return {
              success: function(callback){
                callback({"resources": {
                    "core": {
                      "limit": github.limit,
                      "remaining": github.remaining,
                      "reset": 1433518055
                    },
                    "search": {
                      "limit": 10,
                      "remaining": 10,
                      "reset": 1433514515
                    }
                  },
                  "rate": {
                    "limit": github.limit,
                    "remaining": github.remaining,
                    "reset": 1433518055
                  }
                });
              }
            }
          } 
          else if (url == "https://api.github.com/repos/vbmaarten/bubble/git/blobs/192c823ebfc603dc5aeb22f5414c64d52e7540a1"){
            return {
              success: function(callback){
               callback(codeStoriesBlob);
              }
            }
          }

          else if (url == "https://api.github.com/repos/vbmaarten/bubble/git/blobs/6b01c4688a21fe7666c535c94c707ac2bc66112b"){
            return { 
              success: function(callback){
               callback(jsBlob);
              }
            }
          }
          else if (url == "https://api.github.com/repos/test/test/git/trees/HEAD?recursive=1"){
            return {success: function(callback){callback({tree: []})}}; 
          }

          else {
            return {success: function(callback){callback()}};
          }
        }
    });
  }));

  beforeEach(module("codeStoriesApp")); 

  var CASTNodeFactory;
  var ItemFactory;
  var NarrativeFactory;
  beforeEach(inject(function (_projectManagerFactory_,_CASTNodeFactory_,_ItemFactory_,_NarrativeFactory_){
    projectManagerFactory = _projectManagerFactory_;
    CASTNodeFactory = _CASTNodeFactory_;
    ItemFactory = _ItemFactory_;
    NarrativeFactory = _NarrativeFactory_;
  }));


  //Tests
  it('can get an instance of the factory', function(){
    expect(true).toBe(true);
  });

  it('generates proper NarrativeFactory.FSNarrative objects', function(){
    var item1 = new ItemFactory.TextItem('textitem');

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
    var item = new ItemFactory.TextItem("textitem");
    expect( projectManagerFactory._generateItem(item) ).toEqual({type: 'text', content: 'textitem'});
  });

  it('generates proper link items', function(){    
    var item = new ItemFactory.LinkItem({id: 'narrativeId', node: '/file.js'});
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

    var item1 = new ItemFactory.LinkItem({id: "second_narrative", node: "/file2.js"});
    var item2 = new ItemFactory.TextItem("textitem");

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

  it('should have 60 requests remaining', function(){
    var sufficientCapacity = false;
    projectManagerFactory._githubRateLimitSufficient(60, function(){sufficientCapacity = true});
    expect(sufficientCapacity).toEqual(true);

    var sufficientCapacity = false;
    projectManagerFactory._githubRateLimitSufficient(61, function(){sufficientCapacity = true});
    expect(sufficientCapacity).toBeFalsy();
  });

  it('should extract codestories information from github', function(){
    var root = new CASTNodeFactory.FolderNode('/', null, {});
    var ret = {cast: undefined, narratives: undefined};
    var proceedCalled = false;
    var proceed = function(){proceedCalled = true};
    projectManagerFactory._processGithubElement(csBlobElement, root, ret, proceed);
    expect(proceedCalled).toBeTruthy;
    expect(Object.keys(ret.narratives).length).toBe(3);  
  });

  it('should extract js information from github', function(){
    var root = new CASTNodeFactory.FolderNode('/', null, {});
    var ret = {cast: undefined, narratives: undefined};
    var proceedCalled = false;
    var proceed = function(){proceedCalled = true};    
    projectManagerFactory._processGithubElement(jsBlobElement, root, ret, proceed);
    expect(proceedCalled).toBeTruthy;
    expect(root.children['bubblesort.js']).toBeDefined();
    expect(root.children['bubblesort.js'].isFile).toBeTruthy();
  });

  it('should extract folder information from github', function(){
    var root = new CASTNodeFactory.FolderNode('/', null, {});
    var ret = {cast: undefined, narratives: undefined};
    var proceedCalled = false;
    var proceed = function(){proceedCalled = true};    
    projectManagerFactory._processGithubElement(treeElement, root, ret, proceed);
    expect(proceedCalled).toBeFalsy();
    expect(root.children['sort_algorithms']).toBeDefined();
  });

  it('should load github data', function(){
    spyOn(projectManagerFactory, '_processGithubElement');

    var data = {};
    data.tree = [csBlobElement, jsBlobElement, treeElement];
    var ret = {cast: undefined, narratives: undefined};
    var proceed = function(){};
    projectManagerFactory._loadGitHub(data, ret, proceed);
    expect(projectManagerFactory._processGithubElement).toHaveBeenCalled();
    expect(projectManagerFactory._processGithubElement.calls.count()).toBe(3);

    spyOn(projectManagerFactory, '_loadGitHub').and.callFake(
      function(data,ret,proceed,$this){proceed()}
    );
    projectManagerFactory.loadGitHub('test', 'test', function(){});
    expect(projectManagerFactory._loadGitHub).toHaveBeenCalled();
  });

});