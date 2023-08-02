const MenuIngredientsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'menu_ingredients',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const menuIngredientsHandler = new MenuIngredientsHandler(
      service,
      validator
    );
    server.route(routes(menuIngredientsHandler));
  },
};
