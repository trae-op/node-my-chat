
'use strict';

const privateMessages = require('../handlers/privateMessages');

module.exports = [
  {
    path: '/api/privateMessages',
    method: 'GET',
    config: {
      auth: false
    },
    handler: privateMessages.getPrivateMessages
  },
  {
    path: '/api/privateMessages/{privateMessage_id}',
    method: 'GET',
    config: {
      auth: false
    },
    handler: privateMessages.getPrivateMessageById
  },
  {
    path: '/api/privateMessages',
    method: 'POST',
    config: {
      auth: false
    },
    handler: privateMessages.addPrivateMessage
  },
  {
    path: '/api/privateMessages/{privateMessage_id}',
    method: 'DELETE',
    config: {
      auth: false
    },
    handler: privateMessages.deletePrivateMessageById
  },
  {
    path: '/api/privateMessages',
    method: 'PUT',
    config: {
      auth: false
    },
    handler: privateMessages.updatePrivateMessage
  }
];
