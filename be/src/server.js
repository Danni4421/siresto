require('dotenv').config();
const Hapi = require('@hapi/hapi');
const config = require('./config');
const register = require('./plugin');

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

  await register(server);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
