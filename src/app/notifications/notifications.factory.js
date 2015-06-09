'use strict';
/**
 * @ngdoc service
 * @name notifications.factory:notificationsFactory
 * @description 
 *
 * Factory to track notifications and create new ones.
 */

angular.module('notifications').factory('notificationsFactory', [
  '$timeout',
  function ($timeout) {
    var factory = {};
    var delay = 5000;
    
    /**
     * @ngdoc property
     * @name notifications
     * @propertyOf notifications.factory:notificationsFactory
     * @description
     * Array that contains the currently displayed notifications
     */
    factory.notifications = [];
    /**
     * @ngdoc property
     * @name callback
     * @propertyOf notifications.factory:notificationsFactory
     * @description
     * Function that contains the callback that needs to be called when the notifications array changes
     */
    factory.callback;
    
    var notify = function (type, content) {
      factory.notifications.unshift({
        type: type,
        content: content
      });
      factory.callback();
      $timeout(function () {
        factory.close({
          type: type,
          content: content
        });
      }, delay);
    }
    /**
     * @ngdoc method
     * @name error
     * @methodOf notifications.factory:notificationsFactory
     * @description
     * Creates an error notification
     */
    factory.error = function (content) {
      if (content instanceof Error) {
        console.error(content);
        content = content.notification + '\n' + content.fileName;
      }
      notify('error', content);
    };
    /**
     * @ngdoc method
     * @name success
     * @methodOf notifications.factory:notificationsFactory
     * @description
     * Creates an success notification
     */
    factory.success = function (content) {
      notify('success', content);
    };
    /**
     * @ngdoc method
     * @name info
     * @methodOf notifications.factory:notificationsFactory
     * @description
     * Creates an info notification
     */
    factory.info = function (content) {
      notify('info', content);
    };
    /**
     * @ngdoc method
     * @name close
     * @methodOf notifications.factory:notificationsFactory
     * @description
     * Removes a notification
     */
    factory.close = function (notification) {
      factory.notifications.splice(factory.notifications.indexOf(notification), 1);
      factory.callback();
    };
    /**
     * @ngdoc method
     * @name registerObserverCallback
     * @methodOf notifications.factory:notificationsFactory
     * @description
     * registers the callback function callback to be called when notification array updates
     */
    factory.registerObserverCallback = function (callback) {
      factory.callback = callback;
    };
    
    return factory;
  }
]);