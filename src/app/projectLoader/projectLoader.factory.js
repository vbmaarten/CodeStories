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

      UnpackZip : function (zip) {
        var ret = {
          cast: undefined,
          narratives: undefined
        };

        var root = new FolderNode('project', null, {});

        //Loop through files that are packed in the zip
        Object.getOwnPropertyNames(zip.files).forEach(function (element, index, array) {
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
            if (root.children[element]) {                                  //If the folder is already defined, step into it
              newRoot = root.children[element];
            } else {                                                       //Otherwise, create the folder node. 
              root.children[element] = new FolderNode(element, root, {});  
              newRoot = root.children[element];
            }
          });

          if (!newRoot.children[last]) {
            if(isCodestoriesFile){   //Parse the narratives file
              ret.narratives = JSON.parse(zip.file(element).asText());
            } else if (isDirectory) {  //Create the new directory
              newRoot.children[last] = new FolderNode(last, root, {});
            } else {   //Create the new file
              newRoot.children[last] = new FileNode(last, root, {}, zip.file(element).asText());
              if (isJS) { //If it is a json file, add it's AST to the cast
                newRoot.children[last].children.program = acorn.parse(zip.file(element).asText(), {location: true});
                newRoot.children[last].children.program.setParent( newRoot.children[last] );
              }
            }
          }
        });
        ret.cast = root;

        return ret;
      }

    }
  }
]);