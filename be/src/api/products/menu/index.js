const MenuHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'menu',
  version: '1.0.0',
  register: async (server, { menuService, chefsService, validator }) => {
    const menuHandler = new MenuHandler(menuService, chefsService, validator);
    server.route(routes(menuHandler));
  },
};
