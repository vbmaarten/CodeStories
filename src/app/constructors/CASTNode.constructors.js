var CASTNode = function(name, parent, children){
	this.name = name;
	this.parent = parent;
	this.children = children;
	this.getType = function(){
		if(this instanceof FolderNode)
			return 'folder';
		else if(this instanceof FileNode)
			return 'file';
		else if(this instanceof ASTNode)
			return 'ast_node';
		throw 'BadNodeTypeError';
	}
	this.isFolder = function(){
		return (this.getType() === 'folder')
	}
	this.isFile = function(){
		return (this.getType() === 'file')
	}
	this.isASTNode = function(){
		return (this.getType() === 'ast_node')
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

FolderNode.prototype.type = 'directory';


/*
var node = new FolderNode('test','parent','child');

console.log(node.type); //directory
console.log(node instanceof CASTNode); //true
console.log(node instanceof FolderNode); //true

*/