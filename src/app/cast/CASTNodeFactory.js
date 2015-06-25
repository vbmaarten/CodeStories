'use strict';

/**
 * @ngdoc service
 * @name cast.factory:CASTNodeFactory
 * @description
 * 
 * Provides CAST object creators
 */

angular.module('cast').factory('CASTNodeFactory', [
  'ItemFactory',
  'notificationsFactory',
  function (ItemFactory, notificationsFactory) {
    var CASTNode = function (name, parent, children) {
      this.name = name;
      this.parent = parent;
      this.children = children || {};
      this.narratives = [];
      this.path = null;
    };
    CASTNode.prototype = {
      getPath: function () {
        if (this.path === null) {
          this.path = this.getParent().getPath() + '/' + this.name;
        }
        return this.path;
      },
      getParent: function () {
        return this.parent;
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
        if (!path || path.length === 0) {
          return this.getChild(directChild) || this;
        }
        return this.getChild(directChild).getNode(path);
      },
      getChild: function (name) {
        return this.children[name];
      },
      getChildren: function () {
        return this.children;
      },
      isFolder: function () {
        return this instanceof FolderNode;
      },
      isFile: function () {
        return this instanceof FileNode;
      },
      isJSFile: function(){
        return this.isFile() && (this.name.substr(-3) === ".js");
      },
      isASTNode: function () {
        return this instanceof ASTNode;
      },
      isRootNode: function () {
        return this instanceof RootNode;
      },
      isJSFile: function () {
        return this.name.substr(-3) === '.js';
      },
      isCASTNode: function () {
        return true;
      }
    };
    
    var FolderNode = function (name, parent, children) {
      CASTNode.call(this, name, parent, children);
    };
    FolderNode.prototype = Object.create(CASTNode.prototype);
    FolderNode.prototype.getJSFiles = function(){
      var result = [], name , node;
      for(name in this.children){
        node = this.children[name];
        if(node.isJSFile()){
          result.push(node)
        } else if (node.isFolder()){
          result = result.concat( node.getJSFiles() );
        }
      }
      return result;
    }

    var RootNode = function (name, children) {
      CASTNode.call(this, name, null, children);
      this.path = '';
    };
    RootNode.prototype = Object.create(CASTNode.prototype);
    RootNode.prototype.getJSFiles = FolderNode.prototype.getJSFiles;


    var FileNode = function (name, parent, children, content) {
      CASTNode.call(this, name, parent, children);
      this.content = content;
    };




    FileNode.prototype = Object.create(CASTNode.prototype);
    //return filenode child. Generates the parse tree only when requested with the getChild method
    // The only parseAs mode for the moment is the acorn js parser under the name 'Program';
    FileNode.prototype.getChild = function (parseAs) {
      var children = this.getChildren();
      if (!children[parseAs]) {
        if (parseAs === 'Program') {
          if (this.name.substr(-3) === '.js') {
            //If it is a js file, add it's AST to the cast
            try {
              var AST = acorn.parse(this.content, { locations: true });
              this.children.Program = wrapAcornAsASTNode(AST, 'Program', this);
            } catch (error) {
              notificationsFactory.error(error);
            }
          }
        }
      }
      return children[parseAs];
    };
    var t_node_constructor = acorn.parse('1').constructor;
    Object.defineProperty(t_node_constructor, 'ASTNode', { 'enumerable': false });
    //ASTNodes are a wrapper arround the parse tree that acorn generates
    var ASTNode = function (name, parent, children, tnode) {
      CASTNode.call(this, name, parent, children);
      this.tnode = tnode;
    };

    ASTNode.prototype = Object.create(CASTNode.prototype);

    ASTNode.prototype.getBodyName = function(){
      var name, nameNode = this;
          var tnode ;
          do {
            tnode = nameNode.tnode;
            name = tnode.name || 
                ( (tnode.key) ? tnode.key.name : undefined ) ||
                ( tnode.id ? tnode.id.name : undefined );
            nameNode = nameNode.parent 
          }while( !name && nameNode.tnode );
          if( nameNode.isJSFile() ){
            name = nameNode.name + ' program'
          }
          return name;
    }
    ASTNode.prototype.locationString = function(){
      var loc = this.tnode.loc, locStr;
          if(loc.start.line === loc.end.line){
            locStr =  ' [' + loc.start.line + ']';
          }
          else {
            locStr = ' [' + loc.start.line + '-' + loc.end.line + ']';
          }
          return locStr;
    }
    ASTNode.prototype.containsPosition = function (pos) {
      var tnode = this.tnode;
      if (tnode instanceof Array) {
        tnode = this.parent.tnode;
      } else if (tnode.kind === 'init'){
        return tnode.key.start <= pos && tnode.value.end >= pos;
      }
      return tnode.start <= pos && tnode.end >= pos;
    };
    ASTNode.prototype.getFile = function(){
      var x = this.parent;
      while( !x.isFile() ){
        x = x.parent;
      }
      return x;
    }
    // Attach items to the interpreter ast nodes, under the attribute .codeNarrative[ narrative name ]
    ASTNode.prototype.attachNarrativeHooks = function (codeNarrative) {
      var hooks = codeNarrative.narrativeHooks;
      var t_nodes = [];
      var node;
      for (var i in hooks) {
        node = this.getNode(hooks[i].path);
        t_nodes.push(node.tnode);
        node.tnode.codeNarrative = node.tnode.codeNarrative || {};
        node.tnode.codeNarrative[codeNarrative.name] = [];
        for (var j in hooks[i].items) {
          var item = ItemFactory.Item.prototype.buildItem(hooks[i].items[j]);
          node.tnode.codeNarrative[codeNarrative.name].push(item);
        }
      }
      return t_nodes;
    };
    //create a wrapper tree for a abstract syntax tree generated by acorn with CASTNode like nodes
    function wrapAcornAsASTNode(tnode, astNodeName, parent) {
      var children = {};
      var newASTNode = new ASTNode(astNodeName, parent, children, tnode);
      tnode.ASTNode = newASTNode;
      for (var index in tnode) {
        var subNode = tnode[index];
        if (subNode instanceof t_node_constructor || subNode instanceof Array) {
          var name = index;
          if (subNode.name && subNode.type) {
            name += '_' + subNode.type;
          }
          name = name.split('Statement').join('');
          var child = wrapAcornAsASTNode(subNode, name, newASTNode);
          if (children[name]) {
            throw new Error('Wohoooaaah , same cast paths', children[name], child);
          }
          children[name] = child;
        } else if( astNodeName === 'properties' && subNode.kind === 'init'){
          children[index] = wrapAcornAsASTNode(subNode,index,newASTNode);
        }
      }
      return newASTNode;
    }
    return {
      RootNode: RootNode,
      FileNode: FileNode,
      FolderNode: FolderNode,
      ASTNode: ASTNode
    };
  }
]);