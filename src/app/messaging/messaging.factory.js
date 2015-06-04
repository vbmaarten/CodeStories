angular.module("messaging")
	.factory("messagingFactory", ['$timeout', function($timeout){
		var factory = {};

		var delay = 5000;

		factory.messages = [];

		factory.callback;



		factory.error = function(content){
			if(content instanceof Error){
				console.error(content)
				content = content.message + "\n" +content.fileName;

			}
			factory.messages.unshift({type: 'error', content: content});
			factory.callback();
			$timeout(function(){
				factory.close({type: 'error', content: content});
			}, delay);
		};

		factory.success = function(content){
			factory.messages.unshift({type: 'success', content: content});
			factory.callback();
			$timeout(function(){
				factory.close({type: 'success', content: content});
			}, delay);
		};

		factory.info = function(content){
			factory.messages.unshift({type: 'info', content: content});
			factory.callback();
			$timeout(function(){
				factory.close({type: 'info', content: content});
			}, delay);
		};

		factory.close = function(message){
			factory.messages.splice(factory.messages.indexOf(message), 1);
			factory.callback();
		};

		factory.registerObserverCallback = function(callback) {
			factory.callback = callback;
		}

		return factory;
	}]);