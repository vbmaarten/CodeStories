

Interpreter.prototype.setAst = function(ast,scope){
	var scope;
	this.ast = ast;
	if(scope){
		scope = this.createScope(this.ast, scope);
	} else {
		scope = this.createScope(this.ast, null);
	}
	this.stateStack = [{node: this.ast, scope: scope, thisExpression: scope}];
};


Interpreter.prototype.getCurrentNode = function(){
	return (this.stateStack && this.stateStack[0]) ? this.stateStack[0].node : undefined;
}


function _convertArray(object){
	var property,result = [];
	
	for(property in object.properties){
		result[property] = _convertProperty(object.properties[property]);
	}
	return result;
}

function _convertObject(object){
	var result;
	if(object.length){
		return _convertArray(object);
	} else{
		result = {};
		for(property in object.properties){
			result[property] = _convertProperty(object.properties[property]);
		}
		return result;
	}
}

function _convertProperty(property){
	if(property.isPrimitive){
		return property.data;
	} else {
		if(property.type === 'object'){
			return _convertObject(property);
		}
		else{
			return null;
		}
	}
}
Interpreter.prototype.convertScope =  function(interpreter_scope){
	var  scope , val , property;

	if(interpreter_scope.parentScope){
		scope = this.convertScope(interpreter_scope.parentScope);
	} else{
		// global js scope or This scope. filter out the default variables
		scope = {};
		for( property in interpreter_scope.properties){
			if( !this.defaultGlobalScopeVariables[ property ] ){
				scope[property] = _convertProperty( interpreter_scope.properties[property] )
			}
		}
		return scope;
	}
	for(property in interpreter_scope.properties){
		scope[property] = _convertProperty(interpreter_scope.properties[property]);
	}
	
	return scope;
}

Interpreter.prototype.getCurrentScope = function(){
	var iscope , i = 0 , node;
	var itself;

	do {
		node = this.stateStack[i]
		if(!node ){
			return itself || {};
		}

		
		if(!itself && node.funcThis_ ){
			itself = _convertObject(node.funcThis_)
		}
		iscope = node.scope;
		i++

	} while( !iscope)
	var result = this.convertScope( iscope );
	if(!itself && node.thisExpression){
		itself = _convertObject( node.thisExpression)
	}

	result.this = itself;
	if(this.stateStack[0].value){
		result.$result = _convertProperty(this.stateStack[0].value)
	}
	return result;
}

Interpreter.prototype.defaultGlobalScopeVariables ={
	Infinity: true,
	Array: true,
	Boolean: true,
	Date: true,
	Function: true,
	JSON: true,
	Math: true,
	NaN: true,
	Number: true,
	Object: true,
	RegExp: true,
	String: true,
	decodeURI: true,
	decodeURIComponent: true,
	encodeURI: true,
	encodeURIComponent: true,
	escape: true,
	eval: true,
	isFinite: true,
	isNaN: true,
	parseFloat: true,
	parseInt: true,
	self: true,
	undefined: true,
	unescape: true,
	window: true
}
