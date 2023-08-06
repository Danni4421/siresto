const CategoriesHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'categories',
  version: '1.0.0',
  register: async (server, { categoriesService, chefsService, validator }) => {
    const categoriesHandler = new CategoriesHandler(
      categoriesService,
      chefsService,
      validator
    );
    server.route(routes(categoriesHandler));
  },
};
