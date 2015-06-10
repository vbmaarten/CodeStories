'use strict';
/**
 * @ngdoc service
 * @name narrator.factory:NarrativeFactory
 * @description
 * 
 * Provides Narrative object creators
 */
angular.module('VisualElements').factory('modalFactory', 
	function(){
		var factory = {};

		var activeModal = null;
		var modals = {}

		factory.activate = function(identifier){
			//Present modal <identifier>
			if(activeModal != null){
				modals[activeModal].deactivate();
			} 

			activeModal = identifier;
			modals[identifier].activate();
		}

		factory.closeModal = function(){
			modals[activeModal].deactivate();
			activeModal = null;
		}

		factory.register = function(identifier, accessor){
			modals[identifier] = accessor;
		}

		return factory;
	}
);