var CASTNode = function(name, parent, children){
	this.name = name;
	this.parent = parent;
	this.children = children;
	this.getType = function(){
		if(this instanceof FolderNode)
			return 'directory';
		else if(this instanceof FileNode)
			return 'file';
		else if(this instanceof ASTNode)
			return 'ast';
		console.error('This node has a false type');
		throw 'BadNodeTypeError';
	}
	this.isFolder = function(){
		return (this.getType() === 'directory')
	}
	this.isFile = function(){
		return (this.getType() === 'file')
	}
	this.isASTNode = function(){
		return (this.getType() === 'ast')
	}
	this.up = function(){
		if(!this.parent){
			console.error('This node has no parent');
			throw 'NoParrentError'
			return this.parent;
		}
		return this.parent;
	}
}


var FolderNode = function (name, parent, children) {
	CASTNode.call(this,name,parent,children);
};
FolderNode.prototype = Object.create(CASTNode.prototype);


var FileNode = function (name, parent, children, content) {
	CASTNode.call(this,name,parent,children);
	this.content = content;
};
FileNode.prototype = Object.create(CASTNode.prototype);


var ASTNode = function (name, parent, children) {
	CASTNode.call(this,name,parent,children);
};
ASTNode.prototype = Object.create(CASTNode.prototype);






/*
var node = new FileNode('test','parent','child','<html>');

console.log(node.content); //directory
console.log(node instanceof CASTNode); //true
console.log(node instanceof FileNode); //true
console.log(node instanceof FolderNode); //false
*/


