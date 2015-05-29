angular.module("messaging").factory("messagingFactory", function($timeout){
	var factory = {};


	factory.messages = [
		{type:'info', content:'This is an info message'}
	];

	factory.callback;

	factory.error = function(content){
		this.messages.unshift({type: 'error', content: content});
		factory.callback();
		$timeout(function(){this.close({type: 'error', content: content})}, 4000);
	};

	factory.info = function(content){
		this.messages.unshift({type: 'info', content: content});
		factory.callback();
		$timeout(function(){this.close({type: 'info', content: content})}, 4000);
	};

	factory.close = function(message){
		this.messages.splice(this.messages.indexOf(message), 1);
		factory.callback();
	};

	factory.registerObserverCallback = function(callback) {
		factory.callback = callback;
	}


	return factory;
})