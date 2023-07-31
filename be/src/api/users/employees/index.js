const EmployeesHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'employees',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const employeesHandler = new EmployeesHandler(service, validator);
    server.route(routes(employeesHandler));
  },
};
