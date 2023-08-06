const MenuHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'menu',
  version: '1.0.0',
  register: async (
    server,
    { menuService, chefsService, storageService, validator }
  ) => {
    const menuHandler = new MenuHandler(
      menuService,
      chefsService,
      storageService,
      validator
    );
    server.route(routes(menuHandler));
  },
};
