Interpreter.prototype.setAst = function(ast){
	this.ast = ast;
	var scope = this.createScope(this.ast, null);
	this.stateStack = [{node: this.ast, scope: scope, thisExpression: scope}];
};