'use strict';

/**
 * @ngdoc function
 * @name projectLoader.directive:dropZone
 * @description
 * # dropZone
 * Directive to drop files in
 */
angular.module('projectLoader')
  .directive('dropZone', function () {
    return {
    	restrict: 'A',
    	templateUrl: '/projectLoader/fileReader/dropZone.html',
    	link: function (scope, element, attributes) {
            console.log(element);
            element.bind("dragenter", function (changeEvent) {
                console.log(test);
                element[0].className = element[0].className + " active";
            });
        }
    }
  });

/*
 // Setup the dnd listeners.
    var dropZone = document.getElementById('drop-zone');
    //dropZone.addEventListener('dragover', handleDragOver, false);
    //dropZone.addEventListener('drop', handleFileSelect, false);

    var dropContainer = document.getElementById('drop-container');
    document.addEventListener("dragenter", function( event ) {
      dropContainer.className = dropContainer.className + " active";
    }, false);

    dropZone.addEventListener("dragleave", function( event ) {
        dropContainer.className = "";
    }, false);

    */