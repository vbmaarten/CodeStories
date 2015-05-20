'use strict';

var CASTNode = function (name, parent, children) {
	this.name = name;
	this.parent = parent;
	this.children = children;
	this.narratives = [];
	this.path = null;
};
CASTNode.prototype = {
	getName: function () {
		return this.name;
	},
	getPath: function(){
		if(this.path === null){
			this.path = this.getParent().getPath() + '/' +  this.name;
		}
		return this.path
	},
	setName: function (name) {
		this.name = name;
	},
	getParent: function () {
		return this.parent;
	},
	setParent: function (parent) {
		this.parent = parent;
	},
	getNode: function (path) {
    //ensure path is a array
    if (typeof path === 'string') {
    	path = path.split('/');
    }
    //filter empty and '.' directories
    var directChild;
    do {
    	directChild = path.shift();
    } while (directChild === '' || directChild === '.');
    if (!path || path.length == 0) {
    	return this.getChild(directChild) || this;
    }
    return this.getChild(directChild).getNode(path);
},
getChild: function (name) {
	var child = this.getChildren()[name];
	if (child && !child.getParent()) {
		child.setParent(this);
	}
	return child;
},
getChildren: function () {
	return this.children;
},
getType: function () {
	if (this instanceof FolderNode) {
		return 'directory';
	} else if (this instanceof FileNode) {
		return 'file';
	} else if (this instanceof ASTNode) {
		return 'ast';
	}
	console.error('This node has a false type');
	throw 'BadNodeTypeError';
},
isFolder: function () {
	return this.getType() === 'directory';
},
isFile: function () {
	return this.getType() === 'file';
},
isASTNode: function () {
	return this.getType() === 'ast';
},
up: function () {
	if (!this.parent) {
		console.error('This node has no parent');
		throw 'NoParentError';
		return this.parent;
	}
	return this.parent;
}
};
var FolderNode = function(name, parent, children) {
    CASTNode.call(this, name, parent, children);
};
FolderNode.prototype = Object.create(CASTNode.prototype);
var FileNode = function(name, parent, children, content) {
    CASTNode.call(this, name, parent, children);
    this.content = content;
};
FileNode.prototype = Object.create(CASTNode.prototype);

//return filenode child. only parseAs for the moment is 'program';
FileNode.prototype.getChild = function(parseAs){
	var children = this.getChildren();
	if(!children[parseAs]){
		if (parseAs === 'program' ){
			 if (this.name.endsWith('.js')) { //If it is a json file, add it's AST to the cast
	                var  AST = acorn.parse(this.content, {location: true});
	                this.children.program = wrapAcornAsASTNode(AST,this);
	              }

		}
	}

	return children[parseAs];
}


wrapAcornAsASTNode = function(ast,parent){

	var children = {}
	var newASTNode = new ASTNode(this.name || this.type,parent,children);
	for(var node in ast){
		wrapAcornAsASTNode(ast[node] , newASTNode);
	}

	return newASTNode;
}

var ASTNode = function (name,parent,children) {

	CASTNode.call(this, name, parent, children);

};
var ASTNode = Object.create(CASTNode.prototype);
ASTNode.getChildren = function () {
	return this;
};
ASTNode.getName = function () {
	return this.name || this.type;
};
ASTNode.getType = function () {
	return 'ast';
};
ASTNode.getParent = function () {
	return this.parent;
};
ASTNode.getChildren = function () {
}