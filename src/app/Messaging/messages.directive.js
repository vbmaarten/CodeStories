angular.module("messaging")
	.directive("messages", function(){
		return {
			restrict: 'E',
			templateUrl: 'Messaging/messages.html',
			controller: "MessagingCtrl",
		}
	});