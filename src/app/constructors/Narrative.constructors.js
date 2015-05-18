var Narrative = function(name, CASTNode){
	this.name = name;
	this.CASTNode = CASTNode;
	this.getType = function(){
		if(this instanceof FSNarrative)
			return 'fs_narrative';
		else if(this instanceof CodeNarrative)
			return 'code_narrative';
		throw 'BadNarrativeTypeError';
	}
	this.isCodeNarrative = function(){
		return (this.getType() === 'code_narrative')
	}
	this.isFSNarrative = function(){
		return (this.getType() === 'fs_narrative')
	}
	this.removeItem = function(index){
		if( index instanceof Item)
			index = this.Items.indexOf(index);

		this.Items.splice(index,1);
	}
	this.validItem = function(){
		return false;
	}
	this.addItem = function(item,index){
		if(!this.validItem(item)){
			console.error('Trying to add a wrong type of item',item,this);
			throw "BadItemForNarrative"
		}
		if(index === undefined)
			index = this.Items.length
		this.Items.splice(index,0,item);
	}
	this.addItems = function(items){
		for(var i in items){

			this.addItem( Item.prototype.buildNewItem(items[i]) )
		}
	}
}

var FSNarrative = function (name, CASTNode,items) {
	if( ! (CASTNode.isFile() || CASTNode.isFolder()) ) {
		console.log(' You can not add a FSNarrative on',CASTNode);
		throw "BadNarrativeForCASTNode";
	}

	Narrative.call(this,name,CASTNode);
	this.validItem = function(item){
		return item instanceof Item;
	}
	this.Items = [];
	this.addItems(items);
};

FSNarrative.prototype = Object.create(Narrative.prototype);

var CodeNarrative = function (name, CASTNode) {
	if( !CASTNode.isCodeNarrative() ) {
		console.log(' You can not add a CodeNarrative on',CASTNode);
		throw "BadNarrativeForCASTNode";
	}

	Narrative.call(this,CASTNode);
	this.validItem = function(item){
		if(item instanceof LinkItem)
			return false;
		return item instanceof Item;
	}
	this.Items = [];

};

CodeNarrative.prototype = Object.create(Narrative.prototype);
