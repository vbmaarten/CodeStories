'use strict';
/**
 * @ngdoc service
 * @name projectManager.factory:projectManagerFactory
 * @description 
 * @requires cast.factory:CAST
 *
 * Factory of the projectManager, contains logic for importing and exporting
 * project files. 
 */
angular.module('projectManager').factory('projectManagerFactory', [
  'CAST',
  '$http',
  'CASTNodeFactory',
  'notificationsFactory',
  'VObjectFactory',

  function (CAST, $http, CASTNodeFactory, notificationsFactory, VObjectFactory) {
    var _incrementCounter = function (counter) {
      counter.value = counter.value ? counter.value + 1 : 1;
    };

    var _decrementCounter = function (counter, proceed) {
      counter.value -= 1;
      if (counter.value === 0) {
        proceed();
      }
    };

    return {
      gitHubLoadCounter: { value: undefined },
      _githubRateLimitSufficient: function (amount, callback) {
        $http.get('https://api.github.com/rate_limit').success(function (data) {
          if (data.rate.remaining >= amount) {
            callback();
          } else {
            notificationsFactory.error('GitHub rate insufficient');
          }
        });
      },

      _addVObjects(VObjects){
        for(var key in VObjects){
          VObjectFactory.setVObject(key, VObjects[key])
        }
      },

      _processGithubElement: function (element, root, ret, proceed) {
        var isDirectory = element.type === 'tree';
        var isJS = false;
        var isCodestoriesFile = false;
        var path = element.path.split('/');

        var last = path.pop();

        if (!isDirectory) {
          var fileExtension = last.split('.').pop();
          if (fileExtension === 'js') {
            isJS = true;
          } else if (fileExtension === 'codestories') {
            isCodestoriesFile = true;
          }
        }

        var newRoot = this._walkTo(root, path);
        var $this = this;
        if (!newRoot.children[last]) {
          if (isCodestoriesFile) {
            //Parse the narratives file
            _incrementCounter($this.gitHubLoadCounter);
            $http.get(element.url).success(function (data) {
              var codestories = JSON.parse(atob(data.content));
              ret.narratives = codestories.Narratives;
              $this._addVObjects(codestories.VObjects);
              _decrementCounter($this.gitHubLoadCounter, proceed);
            });
          } else if (isDirectory) {
            //Create the new directory
            newRoot.children[last] = new CASTNodeFactory.FolderNode(last, newRoot, {});
          } else {
            //Create the new file
            _incrementCounter(this.gitHubLoadCounter);
            $http.get(element.url, { responseType: 'text' }).success(function (data) {
              newRoot.children[last] = new CASTNodeFactory.FileNode(last, newRoot, {}, atob(data.content));
              _decrementCounter($this.gitHubLoadCounter, proceed);
            });
          }
        }
      },

      _loadGitHub: function (data, ret, proceed) {
        var root = new CASTNodeFactory.FolderNode('', null, {});
        root.path = '';
        var $this = this;
        data.tree.forEach(function (element) {
          $this._processGithubElement(element, root, ret, proceed);
        });
        ret.cast = root;
      },

      /**
       * @ngdoc method
       * @name loadGitHub
       * @methodOf projectManager.factory:projectManagerFactory
       * @description
       * Loads a github Project   
       *
       * @param {String} username username of the repository owner
       * @param {String} repository the repository to load
       * @param {String} callback callback to run after project is loaded
       */
      loadGitHub: function (username, repository, callback) {
        var ret = {
          cast: undefined,
          narratives: undefined
        };

        var proceed = function () {
          CAST.reset();
          CAST.cast.rootnode = ret.cast;
          CAST.appendNarrative(ret.narratives);
          CAST.project = 'github:' + username + ':' + repository;
          callback();
        };

        var $this = this;
        this._githubRateLimitSufficient(1, function () {
          $http.get('https://api.github.com/repos/' + username + '/' + repository + '/git/trees/HEAD?recursive=1').success(function (data) {
            $this._githubRateLimitSufficient(data.tree.length, function () {
              $this._loadGitHub(data, ret, proceed, $this);
            })
          }).error(function(){
            notificationsFactory.error("GitHub repository not found");
          });;
        });
      },

      /**
       * @ngdoc method
       * @name loadZip
       * @methodOf projectManager.factory:projectManagerFactory
       * @description
       * Loads a project from a zip file  
       *
       * @param {String} data Raw data of the zip file
       */
      loadZip: function (data) {
        var contents = this.UnpackZip(new JSZip(data));
        CAST.reset();
        CAST.cast.rootnode = contents.cast;
        CAST.appendNarrative(contents.narratives);
        CAST.project = name;
      },

      /**
       * @ngdoc method
       * @name packZip
       * @methodOf projectManager.factory:projectManagerFactory
       * @description
       * Generates a zip of the current project state and makes it downloadable in the browser.   
       *
       */
      packZip: function () {
        var zip = new JSZip();
        var rootNode = CAST.cast.rootnode;
        //pack cast
        this._packCastZip(rootNode, zip);
        //pack narratives
        var codestories = this._generateCodeStories(CAST.narratives);
        zip.file('.codestories', JSON.stringify(codestories, null, '  '));
        saveAs(zip.generate({ type: 'blob' }), 'project.zip');
      },

      /**
       * @ngdoc method
       * @name saveCodeStories
       * @methodOf projectManager.factory:projectManagerFactory
       * @description
       * Generates a downloadable .codestories file 
       */
      saveCodeStories: function () {
        var codestories = this._generateCodeStories(CAST.narratives);
        saveAs(new Blob([JSON.stringify(codestories, null, '\t')]), '.codestories');
      },

      _packCastZip: function (root, zip) {
        if (root.children) {
          for (var _child in root.children) {
            var child = root.children[_child];
            if (child.isFolder()) {
              this._packCastZip(child, zip.folder(child.name));
            } else {
              zip.file(child.name, child.content);
            }
          }
        }
      },

      _generateCodeStories: function (narratives) {
        var codestories = {};
        var cd_narratives = {};
        var VObjects = {};
        for (var path in narratives) {
          cd_narratives[path] = [];
          var $this = this;
          narratives[path].forEach(function (narrative) {
            if (narrative.isFSNarrative()) {
              cd_narratives[path].push($this._generateFSNarrative(narrative));
            } else if (narrative.isCodeNarrative()) {
              cd_narratives[path].push($this._generateCodeNarrative(narrative));
            }
          });
          if(cd_narratives[path].length === 0){
            delete cd_narratives[path];
          }
        }

        for (var VObject in VObjectFactory.VObjects){
          VObjects[VObject] = VObjectFactory.VObjects[VObject].toString();
        }
        codestories["Narratives"] = cd_narratives;
        codestories["VObjects"] = VObjects;
        return codestories;
      },

      _generateFSNarrative: function (fsNarrative) {
        var narrative = {};
        narrative.name = fsNarrative.name;
        narrative.type = 'FS';
        narrative.items = [];
        var $this = this;
        fsNarrative.items.forEach(function (fsItem) {
          var item = $this._generateItem(fsItem);
          narrative.items.push(item);
        });
        return narrative;
      },

      _generateCodeNarrative: function (codeNarrative) {
        var narrative = {};
        narrative.name = codeNarrative.name;
        narrative.type = 'Code';
        narrative.narrativeHooks = {};


        var $this = this;
        for (var property in codeNarrative.narrativeHooks) {
          narrative.narrativeHooks[property] = {};
          narrative.narrativeHooks[property].path = codeNarrative.narrativeHooks[property].path;
          narrative.narrativeHooks[property].items = [];
          codeNarrative.narrativeHooks[property].items.forEach(function (item) {
            narrative.narrativeHooks[property].items.push($this._generateItem(item));
          });
        }

        if(codeNarrative.dependencies){
          narrative.dependencies = [];
        }
        for(var dep in codeNarrative.dependencies){
          narrative.dependencies.push(codeNarrative.dependencies[dep].getPath())
        }
        return narrative;
      },

      _generateItem: function (itemObj) {
        var item = {};
        item.type = itemObj.type;
        item.content = itemObj.content;
        return item;
      },

      /**
       * @ngdoc method
       * @name UnpackZip
       * @methodOf projectManager.factory:projectManagerFactory
       * @description
       * Unpacks a zip to generate the appropriate cast and narratives
       *
       * @param {Object} a JSZip object containing a project
       */
      UnpackZip: function (zip) {
        var ret = {
          cast: undefined,
          narratives: undefined
        };

        var root = new CASTNodeFactory.FolderNode('', null, {});
        root.path = '';
        ret.cast = root;

        //Loop through files that are packed in the zip
        var fsPath, fsNode, path, name, isJS, parentFolder,$this = this;;
        for (fsPath in zip.files) {
          fsNode = zip.files[fsPath];
          path = fsPath.split('/');
          name = path.pop();
          if (name === 'codestories' || name === '.codestories') {
            try{
              var codestories = JSON.parse(fsNode.asText());
            } catch(error){

              notificationsFactory.error(error, " Bad Code Stories file");

              root.children['codestories'] = new CASTNodeFactory.FileNode('codestories',root,null,fsNode.asText());
              return ret;
            }
            ret.narratives = codestories.Narratives;
            $this._addVObjects(codestories.VObjects);
          } else if (!fsNode.dir) {
            parentFolder = $this._walkTo(root, path);
            parentFolder.children[name] = new CASTNodeFactory.FileNode(name, parentFolder, {}, fsNode.asText());
          }
        }

        return ret;
      },

      _walkTo: function (root, path) {
        var higherRoot = root;
        path.forEach(function (element) {
          if (higherRoot.children[element]) {
            //If the folder is already defined, step into it
            higherRoot = higherRoot.children[element];
          } else {
            //Otherwise, create the folder node. 
            higherRoot.children[element] = new CASTNodeFactory.FolderNode(element, higherRoot, {});
            higherRoot = higherRoot.children[element];
          }
        });
        return higherRoot;
      }
    };
  }
]);