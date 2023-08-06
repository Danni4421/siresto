require('dotenv').config();
const Jwt = require('@hapi/jwt');
const config = require('./config');

const addJwt = async (server) => {
  await server.register([
    {
      plugin: Jwt,
    },
  ]);

  server.auth.strategy('siresto_jwt', 'jwt', {
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

  server.auth.strategy('superadmin_jwt', 'jwt', {
    keys: config.superadmin_jwt.accessTokenKey,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: config.superadmin_jwt.maxAge,
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
