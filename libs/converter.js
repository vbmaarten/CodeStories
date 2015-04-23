function convertArray(object){
	result = []
	for(property in object.properties){
		result[property] = convertProperty(object.properties[property]);
	}
}

function convertObject(object){
	if(object.length){
		return convertArray(object);
	} else{
		result = {};
		for(property in object.properties){
			obj[property] = convertProperty(object.properties[property]);
		}
		return result;
	}
}

function convertProperty(property){
	if(property.isPrimitive){
		return property.data;
	} else {
		if(property.type === 'object'){
			return convertObject(property);
		}
	}
}

function convertScope(interpreter_scope){
	var  scope;

	if(interpreter_scope.parentScope){
		scope = convertScope(scope.parentScope);
	} else{
		return {};
	}
	for(property in interpreter_scope.properties){
		scope[property] = convertProperty(scope.properties[property]);
	}
	
	return scope;
}
