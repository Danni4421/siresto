require('dotenv').config();
const Hapi = require('@hapi/hapi');
const config = require('./config');
const register = require('./plugin');
const ErrorHandler = require('./error-handling');
const addJwt = require('./auth');

const init = async () => {
  const server = Hapi.server({
    host: config.server.host,
    port: config.server.port,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await addJwt(server);
  await register(server);
  ErrorHandler(server);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
