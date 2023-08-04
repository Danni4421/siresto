const TransactionsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'transactions',
  version: '1.0.0',
  register: async (
    server,
    {
      transactionsService,
      menuIngredientsService,
      ingredientsService,
      validator,
    }
  ) => {
    const transactionsHandler = new TransactionsHandler(
      transactionsService,
      menuIngredientsService,
      ingredientsService,
      validator
    );
    server.route(routes(transactionsHandler));
  },
};
