const routes = (handler) => [
  {
    method: 'POST',
    path: '/employee',
    handler: handler.postEmployeesHandler,
  },
  {
    method: 'GET',
    path: '/employee',
    handler: handler.getEmployeesHandler,
  },
  {
    method: 'GET',
    path: '/employee/{id}',
    handler: handler.getEmployeeByIdHandler,
  },
  {
    method: 'PUT',
    path: '/employee/{id}',
    handler: handler.putEmployeeByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/employee/{id}',
    handler: handler.deleteEmployeeByIdHandler,
  },
];

module.exports = routes;
