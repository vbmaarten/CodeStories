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

      BuildCASTFromZip : function (zip) {
        var root = new FolderNode('project', null, {});
        Object.getOwnPropertyNames(zip.files).forEach(function (element, index, array) {
          var isDirectory = element.slice(-1) === '/';
          var isJS = false;
          var path = element.split('/');
          if (isDirectory) {
            path.pop();
          }
          var last = path.pop();
          if (!isDirectory) {
            if (last.split('.').pop() === 'js') {
              isJS = true;
            }
          }
          var newRoot = root;
          path.forEach(function (element, index, arary) {
            if (root.children[element]) {
              newRoot = root.children[element];
            } else {
              root.children[element] = new FolderNode(element, root, {});
              newRoot = root.children[element];
            }
          });
          if (!newRoot.children[last]) {
            if (isDirectory) {
              newRoot.children[last] = new FolderNode(last, root, {});
            } else {
              console.log(element);
              newRoot.children[last] = new FileNode(last, root, {}, zip.file(element).asText());
              if (isJS) {
                newRoot.children[last].children.program = acorn.parse(zip.file(element).asText());
                newRoot.children[last].children.program.setParent( newRoot.children[last] );
              }
            }
          }
        });
        return root;
      },


      addNarrativesToCast : function (narratives) {
        if (typeof narratives === 'string'){
          narratives = JSON.parse(narratives);
        }
        CAST.appendNarrative(narratives);
      }
    }
  }
]);