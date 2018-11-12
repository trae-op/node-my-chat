
'use strict';

const notifications = require('../handlers/notifications');

module.exports = [
  {
    path: '/api/notifications',
    method: 'GET',
    config: {
      auth: false
    },
    handler: notifications.getNotifications
  },
  {
    path: '/api/notifications/{notification_id}',
    method: 'GET',
    config: {
      auth: 'jwt'
    },
    handler: notifications.getNotificationById
  },
  {
    path: '/api/notifications',
    method: 'POST',
    config: {
      auth: false
    },
    handler: notifications.addNotification
  },
  {
    path: '/api/notifications/{notification_id}',
    method: 'DELETE',
    config: {
      auth: false
    },
    handler: notifications.deleteNotificationById
  }
];
