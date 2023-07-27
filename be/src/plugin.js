const users = require('./api/users');
const UsersService = require('./service/db/users/UsersService');
const UsersValidator = null;

const register = async (server) => {
  await server.register([
    {
      plugin: users,
      options: {
        service: new UsersService(),
        validator: UsersValidator,
      },
    },
  ]);
};

module.exports = register;
