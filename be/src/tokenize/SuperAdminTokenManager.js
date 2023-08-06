const Jwt = require('@hapi/jwt');
const config = require('../config');
const InvariantError = require('../exceptions/client/InvariantError');

const SuperAdminTokenManager = {
  generateAccessToken: async (payload) => {
    return Jwt.token.generate(payload, config.superadmin_jwt.accessTokenKey);
  },
  generateRefreshToken: async (payload) => {
    return Jwt.token.generate(payload, config.superadmin_jwt.refreshTokenKey);
  },
  verifyRefreshToken(refreshToken) {
    try {
      const artifacts = Jwt.token.decode(refreshToken);
      Jwt.token.verifySignature(
        artifacts,
        config.superadmin_jwt.refreshTokenKey
      );

      const { payload } = artifacts.decoded;
      return payload;
    } catch (error) {
      throw new InvariantError('Refresh Token tidak valid.');
    }
  },
};

module.exports = SuperAdminTokenManager;
