angular.module('notifications').factory('notificationsFactory', [
  '$timeout',
  function ($timeout) {
    var factory = {};
    var delay = 5000;
    factory.notifications = [];
    factory.callback;
    factory.error = function (content) {
      if (content instanceof Error) {
        console.error(content);
        content = content.notification + '\n' + content.fileName;
      }
      factory.notifications.unshift({
        type: 'error',
        content: content
      });
      factory.callback();
      $timeout(function () {
        factory.close({
          type: 'error',
          content: content
        });
      }, delay);
    };
    factory.success = function (content) {
      factory.notifications.unshift({
        type: 'success',
        content: content
      });
      factory.callback();
      $timeout(function () {
        factory.close({
          type: 'success',
          content: content
        });
      }, delay);
    };
    factory.info = function (content) {
      factory.notifications.unshift({
        type: 'info',
        content: content
      });
      factory.callback();
      $timeout(function () {
        factory.close({
          type: 'info',
          content: content
        });
      }, delay);
    };
    factory.close = function (notification) {
      factory.notifications.splice(factory.notifications.indexOf(notification), 1);
      factory.callback();
    };
    factory.registerObserverCallback = function (callback) {
      factory.callback = callback;
    };
    return factory;
  }
]);