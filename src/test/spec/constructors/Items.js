'use strict';

describe ( 'Item constructors', function ( ) {


//todo propper vcode parsing 

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
		'node':'/',
		'id':'testnarrative'
	}
}

var textitem;
var videoitem;
var pictureitem;
var vcodeitem;
var linkitem;

	beforeEach(function() {
		textitem = Item.prototype.buildItem(textitemObj);
		videoitem = Item.prototype.buildItem(videoitemObj);
		pictureitem = Item.prototype.buildItem(pictureitemObj);
		vcodeitem = Item.prototype.buildItem(vcodeitemObj);
		linkitem = Item.prototype.buildItem(linkitemObj);
	});


	it('should be a link item ', function() {  

		expect( linkitem instanceof Item ).toEqual(true);
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