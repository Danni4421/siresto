const IngredientsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'ingredients',
  version: '1.0.0',
  register: async (server, { ingredientsService, chefsService, validator }) => {
    const ingredientsHandler = new IngredientsHandler(
      ingredientsService,
      chefsService,
      validator
    );
    server.route(routes(ingredientsHandler));
  },
};
