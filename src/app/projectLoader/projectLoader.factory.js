'use strict';
/**
 * @ngdoc function
 * @name projectLoader.factory:ProjectLoaderCtrl
 * @description
 * # ProjectLoaderCtrl
 * Service of the project loader
 */
 angular.module('projectLoader').factory('projectLoaderFactory', [
 	'$http',
 	'$stateParams',
 	'CAST',
 	function ($http, $stateParams, CAST) {

    return {

      loadZip : function (data) {
        var contents = this.UnpackZip( new JSZip(data) );

        CAST.cast.rootnode = contents.cast;
        CAST.appendNarrative(contents.narratives);

      },

      packZip: function(){
        var zip = new JSZip();

        var root_node = CAST.cast.rootnode;

        //pack cast
        this._packCastZip(root_node,zip);

        //pack narratives
        var narratives = CAST.narratives;
        var codestories = {};
        for(var path in narratives){
          codestories[path] = [];
          var path_narratives = codestories[path];
          narratives[path].forEach(function(path_narrative){
            var narrative = {};
            path_narratives.push(narrative);
            narrative.name = path_narrative.name;   
            narrative.type = path_narrative.type; 
            narrative.items = [];
            path_narrative.items.forEach(function(path_item){
                var item = {};
                item.type = path_item.type;
                item.content = path_item.content;
                narrative.items.push(item);
            });   
          });
        };

        zip.file(".codestories", JSON.stringify(codestories,null,'  '));

        saveAs(zip.generate({type: 'blob'}), "project.zip");
      },

      _packCastZip: function(root, zip){
        if(root.children){
          for(var _child in root.children){
            var child = root.children[_child];
            if(child.isFolder()){
              this._packCastZip(child, zip.folder(child.name));
            } else {
              zip.file(child.name, child.content)
            }
          }
        }
      },

      UnpackZip : function (zip) {
        var ret = {
          cast: undefined,
          narratives: undefined
        };

        var root = new FolderNode('', null, {});
        root.path = '';

        //Loop through files that are packed in the zip
        Object.getOwnPropertyNames(zip.files).forEach(function (element, index, array) {
          console.log(element);
          var isDirectory = element.slice(-1) === '/';
          var isJS = false;
          var isCodestoriesFile = false;

          var path = element.split('/');


          if (isDirectory){
            path.pop();     //avoid empty string at end of path
          }

          var last = path.pop();

          if(!isDirectory){
             var file_extension = last.split('.').pop();
            if (file_extension === 'js') {
              isJS = true;
            } else if(file_extension === 'codestories'){
              isCodestoriesFile = true;
            }
          }          

          var newRoot = root;

          //Walk through the path, until the newRoot is the path the file is being added at
          path.forEach(function (element, index, arary) {
            if (newRoot.children[element]) {                                  //If the folder is already defined, step into it
              newRoot = newRoot.children[element];
            } else {                                                       //Otherwise, create the folder node. 
              newRoot.children[element] = new FolderNode(element, newRoot, {});  
              newRoot = newRoot.children[element];
            }
          });
          console.log(newRoot);
          if (!newRoot.children[last]) {
            if(isCodestoriesFile){   //Parse the narratives file
              ret.narratives = JSON.parse(zip.file(element).asText());
            } else if (isDirectory) {  //Create the new directory
              newRoot.children[last] = new FolderNode(last, root, {});
            } else {   //Create the new file
              newRoot.children[last] = new FileNode(last, root, {}, zip.file(element).asText());
            }
          }
        });
        ret.cast = root;

        return ret;
      }

    }
  }
]);