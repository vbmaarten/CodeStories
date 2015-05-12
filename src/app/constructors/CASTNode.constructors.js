var CASTNode = function(name, parent, children){
	this.name = name;
	this.parent = parent;
	this.children = children;
}

var FolderNode = function (name, parent, children) {
	CASTNode.call(this,name,parent,children);
};

FolderNode.prototype = Object.create(CASTNode.prototype);

FolderNode.prototype.type = 'directory';


/*
var node = new FolderNode('test','parent','child');

console.log(node.type); //directory
console.log(node instanceof CASTNode); //true
console.log(node instanceof FolderNode); //true

*/