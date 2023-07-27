const routes = (handler) => [
  {
    method: 'POST',
    path: '/menu',
    handler: handler.postMenuHandler,
  },
  {
    method: 'GET',
    path: '/menu',
    handler: handler.getMenuHandler,
  },
  {
    method: 'GET',
    path: '/menu/{id}',
    handler: handler.getMenuByIdHandler,
  },
  {
    method: 'PUT',
    path: '/menu/{id}',
    handler: handler.putMenuByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/menu/{id}',
    handler: handler.deleteMenuByIdHandler,
  },
];

module.exports = routes;
