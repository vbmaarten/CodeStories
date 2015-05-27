angular.module('VCodeInterpreter')
.factory('VCodeInterpreterFactory', function() {
    return {
    	VScope: {},

        startSession: function(VObjects) {
        	this.VSCope = {}; 
        },

        resetSession: function(){
        	this.VSCope = {};
        }

        runVCode: function(VCode,scope){
        	this._generateScope(VCode, this.VSCope);

        	with(scope){
	    		with(this.VSCope){
	    			eval(VCode);
	    		}
    		}
        },

        _generateScope: function(code, scope){
			var ast = acorn.parse(code);

			var saveVariable = function(node){scope[node.declarations[0].id.name] = undefined}; 

			acorn.walk.simple(ast, {VariableDeclaration: saveVariable});

			return scope;
        }

    }
});