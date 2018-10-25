
'use strict';

const messages = require('../handlers/messages');

module.exports = [
  {
    path: '/api/messages',
    method: 'GET',
    config: {
      auth: 'jwt'
    },
    handler: messages.getMessages
  },
  {
    path: '/api/messages/{message_id}',
    method: 'GET',
    config: {
      auth: 'jwt'
    },
    handler: messages.getMessageById
  },
  {
    path: '/api/messages',
    method: 'POST',
    config: {
      auth: 'jwt'
    },
    handler: messages.addMessage
  },
  {
  path: '/api/messages/{message_id}',
  method: 'DELETE',
  config: {
    auth: 'jwt'
  },
  handler: messages.deleteMessageById
  },
  {
  path: '/api/messages',
  method: 'PUT',
  config: {
    auth: 'jwt'
  },
  handler: messages.updateMessage
  }
];
