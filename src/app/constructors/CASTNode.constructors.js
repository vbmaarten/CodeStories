'use strict';
var CASTNode = function (name, parent, children) {
	this.name = name;
	this.parent = parent;
	this.children = children;
	this.narratives = [];
};
CASTNode.prototype = {
	getName: function () {
		return this.name;
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
},
addNarratives: function (narratives) {
	this.narratives = this.narratives || [];
	var i, newNarrative, name;
	for (i in narratives) {
		name = narratives[i].name;
		newNarrative = new FSNarrative(name, this, narratives[i].items);
		this.narratives.push(newNarrative);
	}
},
addNarrative: function () {
	this.narratives.push(new FSNarrative('New Narrative', this, []));
}
};
var FolderNode = function (name, parent, children) {
	CASTNode.call(this, name, parent, children);
};
FolderNode.prototype = Object.create(CASTNode.prototype);
var FileNode = function (name, parent, children, content) {
	CASTNode.call(this, name, parent, children);
	this.content = content;
};
FileNode.prototype = Object.create(CASTNode.prototype);
var ASTNode = function () {
};
var astCASTPrototype = Object.create(CASTNode.prototype);
astCASTPrototype.getChildren = function () {
	return this;
};
astCASTPrototype.getName = function () {
	return this.name || this.type;
};
astCASTPrototype.getType = function () {
	return 'ast';
};
astCASTPrototype.getNode = function (path) {
	if (path[0] === 'body' && path[1] !== undefined) {
		path.shift();
		var i = path.shift();
		return this.body[i].getNode(path);
	}
	return CASTNode.prototype.getNode.call(this, path);
};
astCASTPrototype.addNarratives = function (narratives) {
	this.narratives = {};
	var i, newNarrative, name;
	for (i in narratives) {
		name = narratives[i].name;
		newNarrative = new CodeNarrative(name, this, narratives[i].items);
		this.narratives[name] = newNarrative;
	}
};
acorn.parse('1').constructor.prototype = astCASTPrototype;