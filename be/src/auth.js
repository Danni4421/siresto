require('dotenv').config();
const Jwt = require('@hapi/jwt');
const config = require('./config');

const addJwt = async (server) => {
  await server.register([
    {
      plugin: Jwt,
    },
  ]);

  server.auth.strategy('moneybox_jwt', 'jwt', {
    keys: config.jwt.accessTokenKey,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: config.jwt.maxAge,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
  });
};

module.exports = addJwt;
