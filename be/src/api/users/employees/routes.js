const routes = (handler) => [
  {
    method: 'POST',
    path: '/employees',
    handler: handler.postEmployeesHandler,
  },
  {
    method: 'GET',
    path: '/employees',
    handler: handler.getEmployeesHandler,
  },
  {
    method: 'GET',
    path: '/employees/{id}',
    handler: handler.getEmployeeByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/employees/{id}',
    handler: handler.deleteEmployeeByIdHandler,
  },
];

module.exports = routes;
