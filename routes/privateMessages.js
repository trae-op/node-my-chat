
'use strict';

const privateMessages = require('../handlers/privateMessages');

module.exports = [
  {
    path: '/api/privateMessages',
    method: 'GET',
    config: {
      auth: 'jwt'
    },
    handler: privateMessages.getPrivateMessages
  },
  {
    path: '/api/privateMessages/{n}/{limit}/{id}',
    method: 'GET',
    config: {
      auth: 'jwt'
    },
    handler: privateMessages.getPrivateMessagesByLimit
  },
  {
    path: '/api/privateMessages/{privateMessage_id}',
    method: 'GET',
    config: {
      auth: 'jwt'
    },
    handler: privateMessages.getPrivateMessageById
  },
  {
    path: '/api/privateMessages',
    method: 'POST',
    config: {
      auth: 'jwt'
    },
    handler: privateMessages.addPrivateMessage
  },
  {
    path: '/api/privateMessages/{privateMessage_id}',
    method: 'DELETE',
    config: {
      auth: 'jwt'
    },
    handler: privateMessages.deletePrivateMessageById
  },
  {
    path: '/api/privateMessages',
    method: 'PUT',
    config: {
      auth: 'jwt'
    },
    handler: privateMessages.updatePrivateMessage
  }
];
