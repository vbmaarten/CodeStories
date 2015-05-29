angular.module("messaging").controller("MessagingCtrl", ['$scope', "messagingFactory",
	function($scope, messagingFactory){
		$scope.messages = messagingFactory.messages;

		// $scope.$watch(function(){return messagingFactory.messages}, function(newMessages, oldMessages){
		// 	console.log(newMessages, oldMessages);
		// 	$scope.messages = newMessages;
		// });

		var updateMessages = function() {
			$scope.messages = messagingFactory.messages;
			$scope.$apply();
		}

		messagingFactory.registerObserverCallback(updateMessages);

		$scope.close = function(message){
			console.log(message);
			messagingFactory.close(message);
		}
	}]);