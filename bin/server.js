
'use strict';

const Hapi = require('hapi');
const config = require('config');
const _ = require('lodash');
const Inert = require('inert');
const hapiAuthJwt = require('hapi-auth-jwt2');

const users = require('../handlers/users');

const routesUsers = require('../routes/users');
const routesMessages = require('../routes/messages');

const privateKey = config.get('jwt_private_key');

const init = async () => {
  const server = new Hapi.Server({
    port: process.env.PORT || config.get('connection.port'),
    host: config.get('connection.host'),
    routes: { cors: true }
  });

  await server.register(Inert);

  // include our module here ↓↓
  await server.register(hapiAuthJwt);

  server.auth.strategy('jwt', 'jwt',
    { key: privateKey,
      validate: users.validateJwtToken
    });

  server.auth.default('jwt');

  let allRoutes = _.concat(
    routesUsers,
    routesMessages
  );

  server.route(allRoutes);

  server.route({
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
  });

  server.route({
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
  });

  server.route({
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
  });

  await server.start();
  return server;
};


init().then(server => {

  console.log('Server running at:', server.info.uri);

  let io = require('socket.io')(server.listener);
  io.on('connection', (socket) => {

    console.log('user connected');

    socket.on('disconnect', function(){
      console.log('user disconnected');
    });

    socket.on('NewMessage', (message) => {
      console.log('Сonnection received from client: ' + message);
      io.emit('UpdateMessage');
    });
  });

})
.catch(error => {
  console.log(error);
});

