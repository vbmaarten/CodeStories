//Get node closest to cursor and make a selection on that node

var selectNode = function(e,selection){
  console.log(arguments);
  var session = editor.getSession();
  var cursor = selection.getCursor();
  var tree = myInterpreter.ast;
  console.log(cursor);
  var pos = session.getDocument().positionToIndex(cursor,0);
  console.log(pos);
  var node = acorn.walk.findNodeAround(tree, pos,function(a,b){return true;}).node;
  if(node.VCode){
    VCode_editor.setValue(node.VCode);
  } else{
    VCode_editor.setValue("//no vcode defined")
  }

  var range = {};
  range.start = {};
  range.end = {};
  range.start.row = node.loc.start.line - 1 ;
  range.start.column = node.loc.start.column;
  range.end.row = node.loc.end.line - 1;
  range.end.column = node.loc.end.column;

  editor.getSession().selection.setSelectionRange(range);
}; 


var myInterpreter;
function initAlert(interpreter, scope) {
  var wrapper = function(text) {
    text = text ? text.toString() : '';
    return interpreter.createPrimitive(alert(text));
  };
  interpreter.setProperty(scope, 'alert',
      interpreter.createNativeFunction(wrapper));
};

function parseButton() {
  document.getElementById('code').value = editor.getValue();
  var code = document.getElementById('code').value;
  myInterpreter = new Interpreter(code, initAlert);
  disable('');
  editor.getSession().selection.on("changeCursor", selectNode)
}

function stepButton() {
  var range = {
    start: {
      row: 0,
      column: 0
    },
    end: {
      row: 0,
      column: 0
    }
  }

  if (myInterpreter.stateStack[0]) {
    var node = myInterpreter.stateStack[0].node;
    range.start.row = node.loc.start.line - 1 ;
    range.start.column = node.loc.start.column;
    range.end.row = node.loc.end.line - 1;
    range.end.column = node.loc.end.column;
  } 

  editor.getSession().selection.setSelectionRange(range);
  try {
    var ok = myInterpreter.step();
  } finally {
    if (!ok) {
      disable('disabled');
    }
  }
}

function playButton() {
  myInterpreter.runToVCode();
}

function runButton() {

  myInterpreter.run();
}

function disable(disabled) {
  document.getElementById('stepButton').disabled = disabled;
  document.getElementById('runButton').disabled = disabled;
  document.getElementById('playButton').disabled = disabled;
  document.getElementById('exportButton').disabled = disabled;
}
