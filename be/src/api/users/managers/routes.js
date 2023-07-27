const routes = (handler) => [
  {
    method: 'POST',
    path: '/manager',
    handler: handler.postManagerHandler,
  },
  {
    method: 'DELETE',
    path: '/manager/{id}',
    handler: handler.deleteManagerByIdHandler,
  },
];

module.exports = routes;
