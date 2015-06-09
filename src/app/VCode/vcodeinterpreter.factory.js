
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