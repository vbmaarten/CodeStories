    angular.module('VCodeInterpreter')
.factory('vCodeInterpreterFactory', ['VObjectFactory', function(VObjectFactory) {



    var generateScope = function (code, scope){
            var ast = acorn.parse(code);

            var saveVariable = function(node){scope[node.declarations[0].id.name] = undefined}; 

            acorn.walk.simple(ast, {VariableDeclaration: saveVariable});

            return scope;
        }

    var VScope = {};

    return {
        

        startSession: function(VObjects) {
            VScope = {}; 
        },

        resetSession: function(){
            VScope = {};
        },

        runVCode: function(VCodeItem,interpreter_scope){
            generateScope(VCodeItem.content, VScope);


            function detachOldDOMel(DOMel){
                var oldVCodeItem = DOMel.VCodeItem;
                DOMel.VCodeItem = undefined;
                var clone = DOMel.cloneNode(true);
                oldVCodeItem.dom = clone;

                var parent = DOMel.parentNode;
                DOMel.remove();
                parent.appendChild(clone);
            }

            function attachDOMel(DOMel, VCodeItem){
                VCodeItem.dom = DOMel;
                DOMel.VCodeItem = VCodeItem;
            }

            function display(DOMel){
                if(DOMel.parentNode){ //If DOMel is already attached
                    detachOldDOMel(DOMel);
                }

                attachDOMel(DOMel, VCodeItem);         
            }

            with(interpreter_scope){
                with(VScope){
                    with(VObjectFactory){
                        eval(VCodeItem.content);
                    }
                }
            }

        }

        

    }
}]);