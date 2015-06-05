'use strict';

describe ( 'Narratives', function ( ) {


  beforeEach(module('codeStoriesApp'));

  var NarrativeFactory;
  var ItemFactory
  beforeEach(inject(function (_NarrativeFactory_,_ItemFactory_){
   NarrativeFactory = _NarrativeFactory_
   ItemFactory = _ItemFactory_;
  }));


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
	 	textitem = ItemFactory.Item.prototype.buildItem(textitemObj);
		linkitem = ItemFactory.Item.prototype.buildItem(linkitemObj);
		FSN = new NarrativeFactory.FSNarrative('test narrative','/');
		CodeN = new NarrativeFactory.CodeNarrative('test code narrative','/');

     });


	it(' should tests NarrativeFactory.FSNarrative add items', function() {  
		expect( FSN.isFSNarrative() ).toEqual(true);
		expect( FSN.isCodeNarrative() ).toEqual(false);

		FSN.addItems( [textitem , linkitem] );


		expect( FSN.items[0] ).toEqual(textitem);

		FSN.addItem();//add empty item at the end

		expect( FSN.items[2].isEmptyItem() ).toEqual(true);

		FSN.addItem(textitem,2); //add text item again after link item 
		expect( FSN.items[2].isTextItem() ).toEqual(true);

		FSN.addItem( undefined, FSN.items[0])//add empty item after first item;
		expect(FSN.items[1].isEmptyItem() ).toEqual(true);



	 });

	it(' should remove some items', function(){
		FSN.addItems( [textitem , linkitem] );
		FSN.removeItem(textitem);
		expect( FSN.items[0] ).toEqual(linkitem);
		FSN.removeItem(textitem);
		expect( FSN.items[0] ).toEqual(linkitem);

	});

	it(' should tests NarrativeFactory.CodeNarrative add items', function() {  
		expect( CodeN.isFSNarrative() ).toEqual(false);
		expect( CodeN.isCodeNarrative() ).toEqual(true);

		CodeN.addItem( '/' , textitem );



		expect( CodeN.narrativeHooks['/'].items[0] ).toEqual(textitem);

		CodeN.addItem( );//add empty item at the end of '/'

		expect( CodeN.narrativeHooks['/'].items[1].isEmptyItem() ).toEqual(true);

		CodeN.addItem( '/0VariableDeclaration' , textitem );

		expect( CodeN.narrativeHooks['/0VariableDeclaration'].items[0] ).toEqual(textitem);

		expect( function(){ 
				CodeN.addItem('/',linkitem);
				}).toThrow(new TypeError("Trying to add a bad item to narrative"));


	 });

	it(' should tests NarrativeFactory.CodeNarrative remove items', function() {  
		expect( CodeN.isFSNarrative() ).toEqual(false);
		expect( CodeN.isCodeNarrative() ).toEqual(true);

		CodeN.addItem( '/test' , textitem );



		expect( CodeN.narrativeHooks['/test'].items.length ).toEqual(1);

		CodeN.removeItem( '/test' , textitem );//add empty item at the end of '/'

		expect( CodeN.narrativeHooks['/test'].items.length ).toEqual(0);

	 });



 
});