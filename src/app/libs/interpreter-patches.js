Interpreter.prototype.setAst = function(ast){
	this.ast = ast;
	var scope = this.createScope(this.ast, null);
	this.stateStack = [{node: this.ast, scope: scope, thisExpression: scope}];
};



function _convertArray(object){
	result = []
	for(property in object.properties){
		result[property] = _convertProperty(object.properties[property]);
	}
	return result;
}

function _convertObject(object){
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
	var  scope;

	if(interpreter_scope.parentScope){
		scope = convertScope(interpreter_scope.parentScope);
	} else{
		return {};
	}
	for(property in interpreter_scope.properties){
		scope[property] = _convertProperty(interpreter_scope.properties[property]);
	}
	
	return scope;
}

Interpreter.prototype.EvaluateInScope =  function(code){

	var scope = convertScope(iscope);
    var vars = Object.keys(scope);
    var  evalStr = '(function(scope){ '+code+' })(' +
       JSON.stringify(scope) + ')';
    eval(evalStr);
  } 


} 