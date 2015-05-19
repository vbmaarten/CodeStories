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

      UnpackZip : function (zip) {
        var ret = {
          cast: undefined,
          narratives: undefined
        };

        var root = new FolderNode('project', null, {});

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

          path.forEach(function (element, index, arary) {
            if (root.children[element]) {                                  //If the folder is already defined, step into it
              newRoot = root.children[element];
            } else {                                                       //Otherwise, create the folder node. 
              root.children[element] = new FolderNode(element, root, {});  
              newRoot = root.children[element];
            }
          });

          if (!newRoot.children[last]) {
            if(isCodestoriesFile){
              ret.narratives = JSON.parse(zip.file(element).asText());
            } else if (isDirectory) {
              newRoot.children[last] = new FolderNode(last, root, {});
            } else {
              newRoot.children[last] = new FileNode(last, root, {}, zip.file(element).asText());
              if (isJS) {
                newRoot.children[last].children.program = acorn.parse(zip.file(element).asText());
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