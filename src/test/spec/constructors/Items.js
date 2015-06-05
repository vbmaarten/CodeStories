'use strict';

describe ( 'Item constructors', function ( ) {


  // load the controller's module
  beforeEach(module('narrator'));

  var ItemFactory;

  beforeEach(inject(function (_ItemFactory_){
    ItemFactory = _ItemFactory_;
  }));


var textitemObj = {
	'type':'text',
	'content': {
		'node':'/',
		'id':'testnarrative'
	}
}
var videoitemObj = {
	'type':'video',
	'content':'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
}
var pictureitemObj = {
	'type':'picture',
	'content': './test.jpg'
}
var vcodeitemObj = {
	'type':'vcode',
	'content': 'var pichart = new PieChart()'
}
var linkitemObj = {
	'type':'link',
	'content': {
		'path':'/',
		'id':'testnarrative'
	}
}

var textitem;
var videoitem;
var pictureitem;
var vcodeitem;
var linkitem;

	beforeEach(function() {
		textitem = ItemFactory.Item.prototype.buildItem(textitemObj);
		videoitem = ItemFactory.Item.prototype.buildItem(videoitemObj);
		pictureitem = ItemFactory.Item.prototype.buildItem(pictureitemObj);
		vcodeitem = ItemFactory.Item.prototype.buildItem(vcodeitemObj);
		linkitem = ItemFactory.Item.prototype.buildItem(linkitemObj);
	});


	it('should be a link item ', function() {  

		expect( linkitem instanceof ItemFactory.Item ).toEqual(true);
		expect( linkitem.isLinkItem() ).toEqual(true);
		expect( linkitem.content ).toEqual(linkitemObj.content);
		expect( linkitem.isVideoItem() ).toEqual(false);
	});



it(' should be  be the right kind of item ', function() {  


	expect( textitem.isTextItem() ).toEqual(true);
	expect( videoitem.isVideoItem() ).toEqual(true);
	expect( pictureitem.isPictureItem() ).toEqual(true);
	expect( vcodeitem.isVCodeItem() ).toEqual(true);
	expect( linkitem.isLinkItem() ).toEqual(true);

	expect( linkitem.isVideoItem() ).toEqual(false);

});

it(' should not throw an error when a bad type is used ', function() {  

	var baditemObj = textitemObj;
	baditemObj.type = 'nothing'

	expect( function(){ 
		Item.prototype.buildItem(baditemObj); 
		}).toThrow(new TypeError("Unknown item type"));

});




});