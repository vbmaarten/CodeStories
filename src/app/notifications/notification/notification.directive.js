'use strict';
/**
 * @ngdoc directive
 * @name notifications.directive:notifications
 * @scope
 * @restrict E
 * @description
 * Directive of a single notification
 */
angular.module("notifications").directive("notification", function(){
	return {
		restrict: 'E',
		templateUrl: 'notifications/notification/notification.html'
	}
});