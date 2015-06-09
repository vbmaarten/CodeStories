
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
    var generateScope = function (code, scope) {
      var ast = acorn.parse(code);
      var saveVariable = function (node) {
        scope[node.declarations[0].id.name] = undefined;
      };
      acorn.walk.simple(ast, { VariableDeclaration: saveVariable });
      return scope;
    };

    var VScope = {};
    return {
      detachOldDOMel: function(DOMel) {
        var oldVCodeItem = DOMel.VCodeItem;
        DOMel.VCodeItem = undefined;
        var clone = DOMel.cloneNode(true);
        oldVCodeItem.dom = clone;
        var parent = DOMel.parentNode;
        DOMel.remove();
        parent.appendChild(clone);
      },

      attachDOMel: function(DOMel, VCodeItem) {
        VCodeItem.dom = DOMel;
        DOMel.VCodeItem = VCodeItem;
      },

      newSession: function () {
        VScope = {};
      },



      /**
        * @ngdoc method
        * @name runVCode
        * @methodOf VCodeInterpreter.factory:vCodeInterpreterFactory
        * @description
        * Runs VCode. Status: Unsafe , security risk : medium
        * Although 'with' statements are very bad practice. this is by far the easiest way. 
        * The app will run as a static site so users should not be in any real risk as far as we know. 
        * possible 'better' methods: 
        * 1) mock all objects from the global scope. But a mallicous user can still access the window through the dom elements or eval wizardry
        * 2) run the VCode by using the interpreter. This requires a lot of patches to the interpreter to inject the proper methods. We do not have the time. 
        */
      runVCode: function (VCodeItem, interpreterScope) {
        generateScope(VCodeItem.content, VScope);
        var $this = this;
        function display(DOMel) {
          if (DOMel.parentNode) {
            //If DOMel is already attached
            $this.detachOldDOMel(DOMel);
          }
          $this.attachDOMel(DOMel, VCodeItem);
        }
        with (interpreterScope) {
          with (VScope) {
            with (VObjectFactory.VObjects) {
              eval(VCodeItem.content);
            }
          }
        }
      }
    };
  }
]);