'use strict';

angular.module('notifications').directive('notifications', function () {
  return {
    restrict: 'E',
    templateUrl: 'notifications/notifications.html',
    controller: 'NotificationsCtrl'
  };
});