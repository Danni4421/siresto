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
};

module.exports = config;
