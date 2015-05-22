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

var vcodeObj = {
	'type':'link',
	'content':' var pie = new PieChart()'
}


var textitem;
var linkitem;
var FSN; //filesystemnarrative
var CodeN;



	 beforeEach(function() {
	 	textitem = Item.prototype.buildItem(textitemObj);
		linkitem = Item.prototype.buildItem(linkitemObj);
		FSN = new FSNarrative('test narrative','/');
		CodeN = new CodeNarrative('test code narrative','/');

     });


	it(' tests FSNarrative ', function() {  
		expect( FSN.isFSNarrative() ).toEqual(true);
		expect( FSN.isCodeNarrative() ).toEqual(false);

		FSN.addItems( [textitem , linkitem] );


		expect( FSN.items[0] ).toEqual(textitem);

		FSN.addItem();//add empty item at the end

		expect( FSN.items[2].isEmptyItem() ).toEqual(true);

		FSN.addItem(textitem,linkitem); //add text item again after link item 

		expect( FSN.items[2].isTextItem() ).toEqual(true);


	 });

	it(' tests CodeNarrative ', function() {  
		expect( CodeN.isFSNarrative() ).toEqual(false);
		expect( CodeN.isCodeNarrative() ).toEqual(true);

		CodeN.addItems( '/' , [textitem] );
		CodeN.addItems( '/0VariableDeclaration' , [textitem] );


		expect( CodeN.items[0] ).toEqual(textitem);

		CodeN.addItem();//add empty item at the end

		expect( CodeN.items[2].isEmptyItem() ).toEqual(true);

		CodeN.addItem(textitem,linkitem); //add text item again after link item 

		expect( CodeN.items[2].isTextItem() ).toEqual(true);
		

	 });



 
});