
'use strict';

const privateDialogues = require('../handlers/privateDialogues');

module.exports = [
  {
    path: '/api/privateDialogues',
    method: 'GET',
    config: {
      auth: 'jwt'
    },
    handler: privateDialogues.getPrivateDialogues
  },
  {
    path: '/api/privateDialogues/{privateDialog_id}',
    method: 'GET',
    config: {
      auth: 'jwt'
    },
    handler: privateDialogues.getPrivateDialogById
  },
  {
    path: '/api/privateDialogues',
    method: 'POST',
    config: {
      auth: 'jwt'
    },
    handler: privateDialogues.addPrivateDialog
  },
  {
    path: '/api/privateDialogues/{privateDialog_id}',
    method: 'DELETE',
    config: {
      auth: 'jwt'
    },
    handler: privateDialogues.deletePrivateDialogById
  }
];
