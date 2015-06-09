'use strict';

angular.module('notifications').controller('NotificationsCtrl', [
  '$scope',
  'notificationsFactory',
  function ($scope, notificationsFactory) {
    $scope.notifications = notificationsFactory.notifications;
    // $scope.$watch(function(){return notificationsFactory.notifications}, function(newMessages, oldMessages){
    // 	console.log(newMessages, oldMessages);
    // 	$scope.notifications = newMessages;
    // });
    var updateMessages = function () {
      $scope.$apply(function () {
        $scope.notifications = notificationsFactory.notifications;
      });
    };
    notificationsFactory.registerObserverCallback(updateMessages);
    $scope.close = function (notification) {
      console.log(notification);
      notificationsFactory.close(notification);
    };
  }
]);