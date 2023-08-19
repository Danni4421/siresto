const Jwt = require('@hapi/jwt');
const config = require('../config');
const InvariantError = require('../exceptions/client/InvariantError');

const TokenManager = {
  generateAccessToken: async (payload) => {
    return Jwt.token.generate(payload, config.jwt.accessTokenKey);
  },
};

module.exports = TokenManager;
