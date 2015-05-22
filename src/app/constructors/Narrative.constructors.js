'use strict';
var Narrative = function (name, CASTPath) {
	this.name = name;
	this.CASTPath = CASTPath;
};

Narrative.prototype = {
	isCodeNarrative : function () {
		return this instanceof CodeNarrative;
	},
	isFSNarrative : function () {
		return this instanceof FSNarrative
	},
	removeItem : function (index) {
		if (index instanceof Item) {
			index : this.Items.indexOf(index);
		}
		this.Items.splice(index, 1);
	},
	validItem : function () {
		return false;
	}
}



var FSNarrative = function (name, CASTPath, items) {
	/*if (!(CASTPath.isFile() || CASTPath.isFolder())) {
		console.log(' You can not add a FSNarrative on', CASTPath);
		throw 'BadNarrativeForCASTPath';
	}*/
	Narrative.call(this, name, CASTPath);
	this.items = [];
	this.addItems(items);
};

FSNarrative.prototype = Object.create(Narrative.prototype);
FSNarrative.prototype.validItem = function (item) {
		return item instanceof Item;
	};

FSNarrative.prototype.removeItem = function(item){
			var i = this.items.indexOf(item);
			this.	items.splice(i,1);
}

FSNarrative.prototype.addItem = function (item, index) {
		if(!item){
			item = new EmptyItem();
		}
		if (!this.validItem(item)) {
			console.error('Trying to add a wrong type of item', item, this);
			throw 'BadItemForNarrative';
		}
		if (index === undefined) {
			index = this.items.length;
		}

		if(index instanceof Item){
			index = item.indexOf(index) +1;
		}


		this.items.splice(index, 0, item);
	}
FSNarrative.prototype.addItems = function (items) {
		for (var i in items) {
			this.addItem(Item.prototype.buildItem(items[i]));
		}
	}



//items is an array that contains objects {'node' , 'items'}
// the goal is to append to the subnodes of the AST nodes the proper items under the proper name
var CodeNarrative = function (name, CASTPath, itemHooks) {
	Narrative.call(this,name, CASTPath);
	this.itemHooks = itemHooks;
	
};


CodeNarrative.prototype = Object.create(Narrative.prototype);
CodeNarrative.prototype.validItem = function (item) {
		if (item.isLinkItem()) {
			return false;
		}
		return item instanceof Item;
	};
CodeNarrative.prototype.removeItem = function(subnode,item){
	this.itemHooks
			var i = this.items.indexOf(item);
			this.	items.splice(i,1);
}

CodeNarrative.prototype.addItem = function (subnode,item, index) {
		if(!item){
			item = new EmptyItem();
		}
		if (!this.validItem(item)) {
			console.error('Trying to add a wrong type of item', item, this);
			throw 'BadItemForNarrative';
		}
		if (index === undefined) {
			index = this.items.length;
		}

		if(index instanceof Item){
			index = item.indexOf(index) +1;
		}


		this.items.splice(index, 0, item);
	}
