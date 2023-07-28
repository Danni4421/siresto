const routes = (handler) => [
  {
    method: 'POST',
    path: '/admins',
    handler: handler.postManagerHandler,
  },
  {
    method: 'DELETE',
    path: '/admins/{id}',
    handler: handler.deleteManagerByIdHandler,
  },
];

module.exports = routes;
