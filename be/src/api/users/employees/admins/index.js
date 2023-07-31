const AdminsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'admins',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const adminsHandler = new AdminsHandler(service, validator);
    server.route(routes(adminsHandler));
  },
};
