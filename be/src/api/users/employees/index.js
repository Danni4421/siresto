const EmployeesHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'employees',
  version: '1.0.0',
  register: async (
    server,
    { service, adminsService, superAdminsService, validator }
  ) => {
    const employeesHandler = new EmployeesHandler(
      service,
      adminsService,
      superAdminsService,
      validator
    );
    server.route(routes(employeesHandler));
  },
};
