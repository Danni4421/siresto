const Jwt = require('@hapi/jwt');
const config = require('../config');
const InvariantError = require('../exceptions/client/InvariantError');

const TokenManager = {
  generateAccessToken: async (payload) => {
    return Jwt.token.generate(payload, config.jwt.accessTokenKey);
  },
  generateRefreshToken: async (payload) => {
    return Jwt.token.generate(payload, config.jwt.refreshTokenKey);
  },
  verifyRefreshToken: (refreshToken) => {
    try {
      const artifacts = Jwt.token.decode(refreshToken);
      Jwt.token.verifySignature(artifacts, config.jwt.refreshTokenKey);

      const { payload } = artifacts.decoded;
      return payload;
    } catch (error) {
      throw new InvariantError('Refresh token tidak valid.');
    }
  },
};

module.exports = TokenManager;
