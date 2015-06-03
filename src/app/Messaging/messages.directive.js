angular.module("messaging")
	.directive("messages", function(){
		return {
			restrict: 'E',
			templateUrl: 'messaging/messages.html',
			controller: "MessagingCtrl",
		}
	});