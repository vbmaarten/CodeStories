'use strict';

/**
 * @ngdoc function
 * @name projectLoader.controller:ProjectLoaderCtrl
 * @description
 * # ProjectLoaderCtrl
 * Controller of the project loader
 */
angular.module('projectLoader')
  .controller('ProjectLoaderCtrl', ['$scope','CAST', function ($scope, CAST) {
  		var BuildCASTFromZip = function(zip){
  			console.log(zip.files);
		    var root = new FolderNode('/', null, {});
		    Object.getOwnPropertyNames(zip.files).forEach(function(element, index, array){
		        var isDirectory = element.slice(-1) == "/";
		        var isJS = false;
		        var path = element.split("/");

		        if(isDirectory){
	                path.pop();
		        }

		        var last = path.pop();

		        if(!isDirectory){
	                if(last.split(".").pop() == "js"){
                        isJS = true;
	                }
		        }

		        var new_root = root;

		        path.forEach(function(element, index, arary){
		                if(root.children[element]){
	                        new_root = root.children[element];
		                } else {
	                        root.children[element] = new FolderNode(element, root, {});
	                        new_root = root.children[element]
		                }
		        });

		        if(!new_root.children[last]){
	                if(isDirectory){
                        new_root.children[last] = new FolderNode(last, root, {});
	                } else {
	                	console.log(element); 
                        new_root.children[last] = new FileNode(last,root,{},zip.file(element).asText());
                        if(isJS){
                                new_root.children[last].children["program"] = ASTNode("program",new_root.children[last], acorn.parse(zip.file(element).asText()));
                        }
	                }
		        }
	    });

		return root;
	};

	$scope.loadZip = function(data){
		var zip = new JSZip(data);
		CAST.cast["/"	] = BuildCASTFromZip(new JSZip(data));
	}
}])
	.directive('onReadFile', function ($parse) {
		//from http://jsfiddle.net/alexsuch/6aG4x/
		return {
			restrict: 'A',
			scope: false,
			link: function(scope, element, attrs) {
	            var fn = $parse(attrs.onReadFile);
	            
				element.on('change', function(onChangeEvent) {
					var reader = new FileReader();
	                
					reader.onload = function(onLoadEvent) {
						scope.$apply(function() {
							fn(scope, {$fileContent:onLoadEvent.target.result});
						});
					};

					reader.readAsBinaryString((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
				});
			}
		};
});
