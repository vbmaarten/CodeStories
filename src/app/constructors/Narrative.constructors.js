'use strict';
var Narrative = function (name, CASTPath) {
	this.name = name;
	this.CASTPath = CASTPath;
};

Narrative.prototype = {
	getType : function () {
		if (this instanceof FSNarrative) {
			return 'fs_narrative';
		} else if (this instanceof CodeNarrative) {
			return 'code_narrative';
		}
		throw 'BadNarrativeTypeError';
	},
	isCodeNarrative : function () {
		return this.getType() === 'code_narrative';
	},
	isFSNarrative : function () {
		return this.getType() === 'fs_narrative';
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
FSNarrative.prototype.addItem = function (item, index) {
		if (!this.validItem(item)) {
			console.error('Trying to add a wrong type of item', item, this);
			throw 'BadItemForNarrative';
		}
		if (index === undefined) {
			index = this.items.length;
		}
		this.items.splice(index, 0, item);
	}
FSNarrative.prototype.addItems = function (items) {
		for (var i in items) {
			this.addItem(Item.prototype.buildNewItem(items[i]));
		}
	}



//items is an array that contains objects {'node' , 'items'}
// the goal is to append to the subnodes of the AST nodes the proper items under the proper name
var CodeNarrative = function (name, CASTPath, ASTItems) {
	/*if (!CASTPath.isASTNode()) {
		console.log(' You can not add a CodeNarrative on', CASTPath);
		throw 'BadNarrativeForCASTPath';
	}*/
	Narrative.call(this,name, CASTPath);
	this.ASTItems = ASTItems;
	for(var i in ASTItems){
		this.addSubNodeItems(ASTItems[i] , name);
	}
	
};


CodeNarrative.prototype = Object.create(Narrative.prototype);
CodeNarrative.prototype.validItem = function (item) {
		if (item instanceof LinkItem) {
			return false;
		}
		return item instanceof Item;
	};
CodeNarrative.prototype.addSubNodeItems = function( subNode , name){
	var astNode = this.CASTPath.getNode(subNode.node);
	astNode.codeItems = astNode.codeItems || {};
	astNode.codeItems[name] = []
	for(var i in subNode.items){
		var item = Item.prototype.buildNewItem(subNode.items[i]);
		if(!this.validItem(item)){
			throw "BadItemForNarrative";
		}
		astNode.codeItems[name].push(item);
	}
}