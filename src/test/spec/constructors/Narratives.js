'use strict';

describe ( 'Item constructors', function ( ) {


var textitemObj = {
	'type':'text',
	'content': {
		'node':'/',
		'id':'testnarrative'
	}
}

var linkitemObj = {
	'type':'link',
	'content': {
		'node':'/',
		'id':'testnarrative'
	}
}


var textitem;
var linkitem;



	 beforeEach(function() {
	 	textitem = Item.prototype.buildItem(textitemObj);
		linkitem = Item.prototype.buildItem(linkitemObj);
     });


	it(' tests FSNarrative ', function() {  
		var fsn = new FSNarrative('test narrative','/');
		expect( fsn.isFSNarrative() ).toEqual(true);
		expect( fsn.isCodeNarrative() ).toEqual(false);

		fsn.addItems( [textitem , linkitem] );

		expect( fsn. ).toEqual(true);
		expect( linkitem instanceof Item ).toEqual(true);

	 });



 
});