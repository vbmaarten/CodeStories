angular.module("messaging").directive("message", function(){
	return {
		restrict: 'E',
		templateUrl: 'messaging/message/message.html'
	}
});