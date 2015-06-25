  
/**
 * @ngdoc service
 * @name VCodeInterpreter.factory:vCodeInterpreterFactory
 * @requires VCodeInterpreter.factory:VObjectFactory
 * @description
 *
 * Interpreter for the VCode
 */

angular.module('VCodeInterpreter').factory('vCodeInterpreterFactory', [
  'VObjectFactory',
  function (VObjectFactory) {

    var theVCodeFactory = this;

    var generateScope = function (item) {
      var code = item.content;
     
      if(!item.usedVariables){
        item.usedVariables = {};
        var ast = acorn.parse(code);
        var saveVariable = function (node) {
          item.usedVariables[node.declarations[0].id.name] = undefined;
        };

        //Function neccesarry due to bug in acorn.walk.simple
        var base = acorn.walk.base; 
        base.ObjectExpression = function(node, st, c) {
          for (var i = 0; i < node.properties.length; ++i)
            c(node.properties[i].key, st);
        };

        acorn.walk.simple(ast, { VariableDeclaration: saveVariable }, base);
      }
      for(var i in item.usedVariables){
        VScope[i] = undefined;
      }
      
    };

    var detachOldDOMel = function(DOMel) {
        var oldVCodeItem = DOMel.VCodeItem;
        DOMel.VCodeItem = undefined;
        var clone = DOMel.cloneNode(true);
        oldVCodeItem.dom = clone;
        var parent = DOMel.parentNode;
        DOMel.remove();
        parent.appendChild(clone);
      }

    var  attachDOMel = function(DOMel, VCodeItem) {
        VCodeItem.dom = DOMel;
        DOMel.VCodeItem = VCodeItem;
      }

    var VScope = {};



/**
        * @ngdoc method
        * @name runVCodeWithIScopeThis
        * @methodOf VCodeInterpreter.factory:vCodeInterpreterFactory
        * @description
        * Runs VCode. Status: Unsafe , security risk : medium
        * Although 'with' statements are very bad practice. this is by far the easiest way. 
        * The app will run as a static site so users should not be in any real risk as far as we know. 
        * possible 'better' methods: 
        * 1) mock all objects from the global scope. But a mallicous user can still access the window through the dom elements or eval wizardry
        * 2) run the VCode by using the interpreter. This requires a lot of patches to the interpreter to inject the proper methods. We do not have the time. 
        */

       var runVCodeWithIScopeThis = function(interpreterScope,VCodeItem){
          function display(DOMel) {
            if (DOMel.parentNode) {
              //If DOMel is already attached
              detachOldDOMel(DOMel);
            }
            attachDOMel(DOMel, VCodeItem);
          }

              with (interpreterScope) {
                with (VScope) {
                  with (VObjectFactory.VObjects) {
                    eval(VCodeItem.content);
                  }
                }
              }
      };


    return {

      newSession: function () {
        VScope = {};
      },

      
      runVCode: function (VCodeItem, interpreterScope) {

        generateScope(VCodeItem, VScope);
        runVCodeWithIScopeThis.call(interpreterScope.this || {} , interpreterScope, VCodeItem)
          
      }
    };
  }
]);