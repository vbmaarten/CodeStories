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


            function display(DOMel){
                VCodeItem.dom = DOMel

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