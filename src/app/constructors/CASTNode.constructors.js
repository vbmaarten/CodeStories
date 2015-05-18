var CASTNode = function(name, parent, children){
	this.name = name;
	this.parent = parent;
	this.children = children;

}


CASTNode.prototype = {
	getName : function(){
		return this.name;
	},

	setName : function(name){
		this.name= name;
	},

	getParent : function(){
		return this.parent;
	},

	setParent : function(parent){
		this.parent = parent;
	},

	getNode : function(path){


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
	},

	getChild : function(name){

		return this.getChildren()[name]	
	},
	getChildren : function(){
		return this.children;
	},
	getType : function(){
		if(this instanceof FolderNode)
			return 'directory';
		else if(this instanceof FileNode)
			return 'file';
		else if(this instanceof ASTNode)
			return 'ast';
		console.error('This node has a false type');
		throw 'BadNodeTypeError';
	},
	isFolder : function(){
		return (this.getType() === 'directory')
	},
	isFile : function(){
		return (this.getType() === 'file')
	},
	isASTNode : function(){
		return (this.getType() === 'ast')
	},
	up : function(){
		if(!this.parent){
			console.error('This node has no parent');
			throw 'NoParentError'
			return this.parent;
		}
		return this.parent;
	},
	
	addNarratives : function(narratives){
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


var ASTNode = function(){}

var ast_CAST_wrapper = Object.create(CASTNode.prototype);
ast_CAST_wrapper.getChildren = function(){
		return this;

	}
ast_CAST_wrapper.getName = function(){
	return this.name || this.type
}
ast_CAST_wrapper.getType = function(){ return 'ast';};
ast_CAST_wrapper.getNode = function(path){

	if(path[0] === 'body' && path[1] != undefined){
		path.shift();
		var i = path.shift();
		return this.body[i].getNode(path);
	}
	return CASTNode.prototype.getNode.call(this,path);

}
ast_CAST_wrapper.addNarratives = function(narratives){
		this.narratives = {}
		var i , new_narrative, name;
		for( i in narratives){
  			name = narratives[i]
			new_narrative = new CodeNarrative( name , this , narratives[i].items);
			this.narratives.name = new_narrative;

		
	}


}

acorn.parse('1').constructor.prototype = ast_CAST_wrapper;

