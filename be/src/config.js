const config = {
  server: {
    host: process.env.HOST,
    port: process.env.PORT,
  },
  jwt: {
    accessTokenKey: process.env.ACCESS_TOKEN_KEY,
    refreshTokenKey: process.env.REFRESH_TOKEN_KEY,
    maxAge: process.env.ACCESS_TOKEN_AGE,
  },
  superadmin_jwt: {
    accessTokenKey: process.env.ACCESS_TOKEN_SUPER_ADMIN_KEY,
    refreshTokenKey: process.env.REFRESH_TOKEN_SUPER_ADMIN_KEY,
    maxAge: process.env.ACCESS_TOKEN_AGE_SUPER_ADMIN,
  },
};

module.exports = config;
