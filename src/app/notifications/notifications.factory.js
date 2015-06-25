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
    var data = {};
    var delay = 5000;
    
    /**
     * @ngdoc property
     * @name notifications
     * @propertyOf notifications.factory:notificationsFactory
     * @description
     * Array that contains the currently displayed notifications
     */
    data.notifications = [];
    
    var notify = function (type, content) {
      data.notifications.unshift({
        type: type,
        content: content
      });
      $timeout(function () {
        close({
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
    var error = function (content) {
      if (content instanceof Error) {
        console.error(content);

        content = content.message + '\n' +  content.notification + '\n' + content.fileName;
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
    var success = function (content) {
      notify('success', content);
    };
    /**
     * @ngdoc method
     * @name info
     * @methodOf notifications.factory:notificationsFactory
     * @description
     * Creates an info notification
     */
    var info = function (content) {
      notify('info', content);
    };
    /**
     * @ngdoc method
     * @name close
     * @methodOf notifications.factory:notificationsFactory
     * @description
     * Removes a notification
     */
    var close = function (notification) {
      data.notifications.splice(data.notifications.indexOf(data.notification), 1);
    };

    return { 
        info:info,
        error:error,
        success:success,
        data:data
        };
  }
]);