'use strict';
var Item = function (content) {
	this.content = content;
};
Item.prototype.buildNewItem = function (item) {
	var type = item.type;
	if (type === 'text') {
		return new TextItem(item.content);
	} else if (type === 'link') {
		return new LinkItem(item.content);
	} else if (type === 'vcode'){
		return new VCodeItem(item.content);
	}
	console.error('unknown item type', item);
	throw 'unidentifiedItem';
};
var TextItem = function (content) {
	Item.call(this, content);
};
TextItem.prototype = Object.create(Item.prototype);
TextItem.prototype.type = "text";

var VideoItem = function (content) {
	Item.call(this, content);
};
VideoItem.prototype = Object.create(Item.prototype);
VideoItem.prototype.type = "video";

var PictureItem = function (content) {
	Item.call(this, content);
};
PictureItem.prototype = Object.create(Item.prototype);
PictureItem.prototype.type = "picture";

var VCodeItem = function (content) {
	Item.call(this, content);
};
VCodeItem.prototype = Object.create(Item.prototype);
VCodeItem.prototype.type = "vcode";

var LinkItem = function (content) {
	Item.call(this, content);
};
LinkItem.prototype = Object.create(Item.prototype);
LinkItem.prototype.type = "link";