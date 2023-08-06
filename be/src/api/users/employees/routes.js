const routes = (handler) => [
  {
    method: 'POST',
    path: '/employees',
    handler: handler.postEmployeesHandler,
    options: {
      auth: 'superadmin_jwt',
    },
  },
  {
    method: 'GET',
    path: '/employees',
    handler: handler.getEmployeesHandler,
    options: {
      auth: 'siresto_jwt' || 'superadmin_jwt',
    },
  },
  {
    method: 'GET',
    path: '/employees/{id}',
    handler: handler.getEmployeeByIdHandler,
    options: {
      auth: 'siresto_jwt' || 'superadmin_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/employees/{id}',
    handler: handler.deleteEmployeeByIdHandler,
    options: {
      auth: 'superadmin_jwt',
    },
  },
];

module.exports = routes;
