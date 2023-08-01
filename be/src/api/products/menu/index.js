const MenuHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'menu',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const menuHandler = new MenuHandler(service, validator);
    server.route(routes(menuHandler));
  },
};
