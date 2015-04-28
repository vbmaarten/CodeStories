function import_file(content){
	console.log(content);
	var pack = JSON.parse(content);

	myInterpreter = new Interpreter(pack.sourcecode, initAlert);
	
	try{
	editor.setValue(pack.sourcecode);}
	catch(e){}
	disable('');
	
	editor.getSession().selection.on("changeCursor", selectNode);
	attach_VCode(myInterpreter.ast,pack.VCode);
}

function attach_VCode(ast,VCode_ast){
	for(var varname in VCode_ast){
		if(varname === "VCode"){
			ast.VCode = VCode_ast.VCode;
		} else {
		attach_VCode(ast[varname],VCode_ast[varname]);
		}
	}

}


function detach_VCode(node){
	if(typeof node === "object"){
	var result = {};
	for(var varname in node){
		if(varname === "VCode"){
			result.VCode = node.VCode;
		}
		if(typeof node[varname] === "object"){
			var vcode = detach_VCode(node[varname]);
			if(vcode)
				result[varname] = vcode
		}

	}

	if(Object.keys(result).length != 0){
			return result;
		}

	}
	return null;
}

function export_file(filename){
	var file = {}
	file.VCode = detach_VCode(myInterpreter.ast)
	file.sourcecode = editor.getValue();
		filename = filename || 'unnamed'
	download(filename+'.vc' , JSON.stringify(file));
}

function download(filename, text) {
  var pom = document.createElement('a');
  pom.setAttribute('href', 'data:Application/octet-stream,' + encodeURIComponent(text));
  pom.setAttribute('download', filename);

  pom.style.display = 'none';
  document.body.appendChild(pom);

  pom.click();

  document.body.removeChild(pom);
}

function handleFileSelect(evt) {
	evt.stopPropagation();
	evt.preventDefault();
	dropContainer.className = "";

	var file = evt.dataTransfer.files[0]; // FileList object
	var reader = new FileReader();
	reader.onloadend = function(){import_file(reader.result)};
	reader.readAsText(file);
}

function handleDragOver(evt) {
	evt.stopPropagation();
	evt.preventDefault();
	evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

// Setup the dnd listeners.
var dropZone = document.getElementById('drop-zone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);

var dropContainer = document.getElementById('drop-container');
document.addEventListener("dragenter", function( event ) {
  dropContainer.className = dropContainer.className + " active";
}, false);

dropZone.addEventListener("dragleave", function( event ) {
	dropContainer.className = "";
}, false);