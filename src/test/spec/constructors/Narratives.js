'use strict';

describe ( 'Narratives', function ( ) {


var textitemObj = {
	'type':'text',
	'content': "text"
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


	it(' should tests FSNarrative add items', function() {  
		expect( FSN.isFSNarrative() ).toEqual(true);
		expect( FSN.isCodeNarrative() ).toEqual(false);

		FSN.addItems( [textitem , linkitem] );


		expect( FSN.items[0] ).toEqual(textitem);

		FSN.addItem();//add empty item at the end

		expect( FSN.items[2].isEmptyItem() ).toEqual(true);

		FSN.addItem(textitem,2); //add text item again after link item 
		expect( FSN.items[2].isTextItem() ).toEqual(true);

		FSN.addItem( undefined, FSN.items[0])//add empty item after first item;
		expect(FSN.items[1].isEmptyItem() ).toEqual(true);;


	 });

	it(' should tests CodeNarrative add items', function() {  
		expect( CodeN.isFSNarrative() ).toEqual(false);
		expect( CodeN.isCodeNarrative() ).toEqual(true);

		CodeN.addItem( '/' , textitem );



		expect( CodeN.itemHooks['/'].items[0] ).toEqual(textitem);

		CodeN.addItem( );//add empty item at the end of '/'

		expect( CodeN.itemHooks['/'].items[1].isEmptyItem() ).toEqual(true);

		CodeN.addItem( '/0VariableDeclaration' , textitem );

		expect( CodeN.itemHooks['/0VariableDeclaration'].items[0] ).toEqual(textitem);

		expect( function(){ 
				CodeN.addItem('/',linkitem);
				}).toThrow(new TypeError("Trying to add a bad item to narrative"));


	 });



 
});