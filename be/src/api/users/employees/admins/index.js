const AdminsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'admins',
  version: '1.0.0',
  register: async (server, { service, superAdminsService, validator }) => {
    const adminsHandler = new AdminsHandler(
      service,
      superAdminsService,
      validator
    );
    server.route(routes(adminsHandler));
  },
};
