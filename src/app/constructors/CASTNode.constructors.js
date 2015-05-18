var CASTNode = function(name, parent, children){
	this.name = name;
	this.parent = parent;
	this.children = children;

	this.getNode = function(path){


		//ensure path is a array
		if(typeof path == "string"){
			path = path.split('/');
		}



		//filter empty and '.' directories
		do{
			var directChild = path.shift(); 
		} while(directChild === ""  || directChild === "." )

		if(!path || path.length == 0)
			return this.getChild(directChild) || this;

		return this.getChild(directChild).getNode(path);
	}

	this.getChild = function(name){

		return this.children[name];
	}
	this.getChildren = function(){
		return this.children;
	}
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
			throw 'NoParentError'
			return this.parent;
		}
		return this.parent;
	}
	this.addNarratives = function(narratives){
		this.narratives = {}
		var i , new_narrative, name;
		for( i in narratives){
  			name = narratives[i]
			new_narrative = new FSNarrative( name , this , narratives[i].items);
			this.narratives.name = new_narrative;

		}
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


var ASTNode = function (ast, parent) {
	CASTNode.call(this,ast.type,parent);
	for(var key in ast){
		var subNode = ast[key];
		if(subNode.end || subNode instanceof Array){
			ast[key] = new ASTNode(ast[key],ast)
			this.children[key] = ast[key];
		}
	}
	this.getChildren = function(){
		return children;
	}
	this.getChild = function(name){
		return children[name];
	}
};
ASTNode.prototype = Object.create(CASTNode.prototype);



/*
var node = new FileNode('test','parent','child','<html>');

console.log(node.content); //directory
console.log(node instanceof CASTNode); //true
console.log(node instanceof FileNode); //true
console.log(node instanceof FolderNode); //false
*/


