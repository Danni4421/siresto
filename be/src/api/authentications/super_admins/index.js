const SuperAdminsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'superadmins',
  version: '1.0.0',
  register: async (
    server,
    {
      service,
      tokenManager,
      authenticationsService,
      validator,
      AuthenticationsValidator,
    }
  ) => {
    const superAdminsHandler = new SuperAdminsHandler(
      service,
      tokenManager,
      authenticationsService,
      validator,
      AuthenticationsValidator
    );
    server.route(routes(superAdminsHandler));
  },
};
