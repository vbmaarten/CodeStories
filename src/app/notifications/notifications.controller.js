'use strict';
/**
 * @ngdoc controller
 * @name notifications.controller:NotificationsCtrl
 * @description
 * @requires notifications.factory:notificationsFactory
 * Displays notifications
 */
angular.module('notifications').controller('NotificationsCtrl', [
  '$scope',
  'notificationsFactory',
  function ($scope, notificationsFactory) {

    $scope.data = notificationsFactory.data;


    $scope.close = function (notification) {
      notificationsFactory.close(notification);
    };
  }
]);