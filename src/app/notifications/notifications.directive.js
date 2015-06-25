'use strict';
/**
 * @ngdoc directive
 * @name notifications.directive:notifications
 * @scope
 * @restrict E
 * @description
 * Directive that displays the current active notifications
 */
angular.module('notifications').directive('notifications', function () {
  return {
    restrict: 'E',
    templateUrl: 'notifications/notifications.html',
    controller: 'NotificationsCtrl'
  };
});