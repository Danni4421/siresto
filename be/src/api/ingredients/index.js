const IngredientsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'ingredients',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const ingredientsHandler = new IngredientsHandler(service, validator);
    server.route(routes(ingredientsHandler));
  },
};
