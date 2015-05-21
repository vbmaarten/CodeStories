'use strict';

var CASTNode = function(name, parent, children) {
    this.name = name;
    this.parent = parent;
    this.children = children;
    this.narratives = [];
    this.path = null;
};
CASTNode.prototype = {
    getName: function() {
        return this.name;
    },
    getPath: function() {
        if (this.path === null) {
            this.path = this.getParent().getPath() + '/' + this.name;
        }
        return this.path
    },
    setName: function(name) {
        this.name = name;
    },
    getParent: function() {
        return this.parent;
    },
    setParent: function(parent) {
        this.parent = parent;
    },
    getNode: function(path) {
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
    getChild: function(name) {
        
        return this.children[name];
    },
    getChildren: function() {
        return this.children;
    },
    getType: function() {
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
    isFolder: function() {
        return this.getType() === 'directory';
    },
    isFile: function() {
        return this.getType() === 'file';
    },
    isASTNode: function() {
        return this.getType() === 'ast';
    },
    up: function() {
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
FileNode.prototype.getChild = function(parseAs) {
    var children = this.getChildren();
    if (!children[parseAs]) {
        if (parseAs === 'Program') {
            if (this.name.endsWith('.js')) { //If it is a json file, add it's AST to the cast
                var AST = acorn.parse(this.content, {
                    locations: true
                });
                this.children.Program = wrapAcornAsASTNode(AST, 'Program',this);
            }

        }
    }

    return children[parseAs];
}


var t_node_constructor = acorn.parse('1').constructor;
Object.defineProperty(t_node_constructor,'ASTNode',{
    'enumerable': false
})

var ASTNode = function (name,parent,children,tnode) {
    CASTNode.call(this, name , parent, children);
    this.tnode = tnode;
};
ASTNode.prototype = Object.create(CASTNode.prototype);
ASTNode.prototype.containsPosition = function(pos){
    var tnode = this.tnode;
    if(tnode instanceof Array){
        tnode = this.parent.tnode;
    }
    return (tnode.start < pos && tnode.end > pos)

}



function wrapAcornAsASTNode(tnode,name,parent){

    var children = {}
    var newASTNode = new ASTNode(name,parent,children,tnode);
    tnode.ASTNode = newASTNode;

    for(var index in tnode){
        var subNode = tnode[index];
        if( subNode instanceof t_node_constructor || subNode instanceof Array ){
            var name = subNode.name || subNode.type || 'Body';
            if(subNode.name && subNode.type){
                name += '_' + subNode.type;
            }
            name = name.split('Statement').join('');
            if(tnode instanceof Array){
                name = index+name;
            } 

            var child = wrapAcornAsASTNode( subNode, name , newASTNode);
            children[name] = child; 
        }
    }
    return newASTNode;

}
