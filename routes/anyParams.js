
'use strict';

module.exports = [
  {
    method: 'GET',
    path: '/{param*}',
    config: {
      auth: false
    },
    handler: {
      directory : {
        path : 'public'
      }
    }
  },
  {
    method: 'GET',
    path: '/auth/{param*}',
    config: {
      auth: false
    },
    handler: {
      directory : {
        path : 'public'
      }
    }
  },
  {
    method: 'GET',
    path: '/chat/{param*}',
    config: {
      auth: false
    },
    handler: {
      directory : {
        path : 'public'
      }
    }
  },
  {
    method: 'GET',
    path: '/users/{param*}',
    config: {
      auth: false
    },
    handler: {
      directory : {
        path : 'public'
      }
    }
  },
  {
    method: 'GET',
    path: '/private_dialog/{param*}',
    config: {
      auth: false
    },
    handler: {
      directory : {
        path : 'public'
      }
    }
  }
];