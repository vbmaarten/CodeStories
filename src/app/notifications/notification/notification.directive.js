'use strict';

angular.module("notifications").directive("notification", function(){
	return {
		restrict: 'E',
		templateUrl: 'notifications/notification/notification.html'
	}
});