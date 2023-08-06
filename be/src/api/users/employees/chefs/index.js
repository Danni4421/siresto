const ChefsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'chefs',
  version: '1.0.0',
  register: async (
    server,
    { service, adminsService, superAdminsService, validator }
  ) => {
    const chefsHandler = new ChefsHandler(
      service,
      adminsService,
      superAdminsService,
      validator
    );
    server.route(routes(chefsHandler));
  },
};
