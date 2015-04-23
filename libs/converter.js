function convertProperty(property){
	if(property.isPrimitive){
		return property.data;
	} else {
		return null;
	}
}

function convertScope(interpreter_scope){
	var  scope;

	if(interpreter_scope.parentScope){
		scope = convertScope(interpreter_scope.parentScope);
	} else{
		return {};
	}
	for(property in interpreter_scope.properties){
		scope[property] = convertProperty(interpreter_scope.properties[property]);
	}
	
	return scope;
}
