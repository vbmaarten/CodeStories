var Item = function(content){
	this.content = content;
}

var TextItem = function (content) {
	Item.call(this,content);
};
TextItem.prototype = Object.create(Item.prototype);

var VideoItem = function (content) {
	Item.call(this,content);
};
VideoItem.prototype = Object.create(Item.prototype);

var PictureItem = function (content) {
	Item.call(this,content);
};
PictureItem.prototype = Object.create(Item.prototype);

var VCodeItem = function (content) {
	Item.call(this,content);
};
VCodeItem.prototype = Object.create(Item.prototype);

var LinkItem = function (content) {
	Item.call(this,content);
};
LinkItem.prototype = Object.create(Item.prototype);
