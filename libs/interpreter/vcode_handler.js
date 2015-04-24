Interpreter.prototype.step = function() {
  if (this.stateStack.length == 0) {
    return {'success':false,'error':undefined};
  }
  var state = this.stateStack[0];
  var stackSize = this.stateStack.length;
  this['step' + state.node.type]();

  //if stateStack is now smaller then before -> node has been poped
  if(stackSize > this.stateStack.length && state.node.VCode){
    var iscope = this.getScope();
    var scope = convertScope(iscope);
    var vars = Object.keys(scope);
    var  evalStr = '(function(scope){ '+state.node.VCode+' })(' +
    JSON.stringify(scope) + ')';
    eval(evalStr);

    return {'success':true,'VCode':true};
  } 
  return {'success':true,'VCode':false};
};

Interpreter.prototype.runToVCode = function() {

  var stepResult = false;
  do {
    stepResult = this.step();


  }while(stepResult.success && !stepResult.VCode)
};
