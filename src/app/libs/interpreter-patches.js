Interpreter.prototype.setAst = function(ast){
	this.ast = ast;
	var scope = this.createScope(this.ast, null);
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
		return {};
	}
	for(property in interpreter_scope.properties){
		scope[property] = _convertProperty(interpreter_scope.properties[property]);
	}
	
	return scope;
}

Interpreter.prototype.getCurrentScope = function(){
	var iscope , i = 0; 
	do {
		if(!this.stateStack[i] ){
			return {};
		}
		iscope = this.stateStack[i].scope;
		i++
	} while( !iscope)

	return this.convertScope( iscope );
}
