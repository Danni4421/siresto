const CartsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'carts',
  version: '1.0.0',
  register: async (
    server,
    { service, ingredientsService, menuIngredientsService, validator }
  ) => {
    const cartsHandler = new CartsHandler(
      service,
      ingredientsService,
      menuIngredientsService,
      validator
    );
    server.route(routes(cartsHandler));
  },
};
