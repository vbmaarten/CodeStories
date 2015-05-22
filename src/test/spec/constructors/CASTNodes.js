'use strict';

describe ( 'Item constructors', function ( ) {


//todo propper vcode parsing 

var root
var folder
var file;

var bubblesort_str = ' function sort(values) {' + 
 '  var length = values.length - 1;' + 
 '  do {' + 
 '    var swapped = false;' + 
 '    for(var i = 0; i < length; ++i) {' + 
 '      if (values[i] > values[i+1]) {' + 
 '        var temp = values[i];' + 
 '        values[i] = values[i+1];' + 
 '        values[i+1] = temp;' + 
 '        swapped = true;' + 
 '      }' + 
 '    }' + 
 '  }' + 
 '  while(swapped == true)' + 
 '};' + 
 'sort.prototype.swag = true;' + 
 'sort([7, 4, 5, 2, 9, 1]);' 


 var codenarrative 

	beforeEach(function() {

		root = new RootNode();
		folder = new FolderNode('afolder',root);
		file = new FileNode('afile.js',folder,{},bubblesort_str);
		codeNarrative = new CodeNarrative()
		root.children['afolder'] = folder;
		folder.children['afile.js'] = file;
	});


	it(' should get the subnodes by their path ', function() {  
		expect( root.isRootNode() ).toEqual(true);
		expect( root.getNode('/afolder').isFolder() ).toEqual(true);
		expect( root.getNode('/afolder/afile.js').isFile() ).toEqual(true);
		expect( root.getNode('/afolder/afile.js/Program').isASTNode() ).toEqual(true);
	});

	it(' should genereate the program subnode of a js file', function() {  
		var program = root.getNode('/afolder/afile.js/Program');

		expect( program.isASTNode() ).toEqual(true);
		
		var theOneOnLine2 = program.getNode('/body/0/body/body/0/declarations/0/init/right');
		
		expect( theOneOnLine2.tnode.value ).toEqual( 1 );
		
	});

	it(' should check that the node contains the propper position ', function() {  
		var program = root.getNode('/afolder/afile.js/Program');
		
		expect( program.getNode('/body/3/expression/arguments').containsPosition(bubblesort_str.length-5) ).toEqual( true );
		
	});

	it(' should set the propper items on t_nodes',function(){

		console.log('todo')

	})




});