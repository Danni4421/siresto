const ChefsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'chefs',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const chefsHandler = new ChefsHandler(service, validator);
    server.route(routes(chefsHandler));
  },
};
