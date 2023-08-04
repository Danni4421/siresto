const routes = (handler) => [
  {
    method: 'POST',
    path: '/menu',
    handler: handler.postMenuHandler,
    options: {
      auth: 'siresto_jwt',
    },
  },
  {
    method: 'GET',
    path: '/menu',
    handler: handler.getMenuHandler,
    options: {
      auth: 'siresto_jwt',
    },
  },
  {
    method: 'GET',
    path: '/menu/{id}',
    handler: handler.getMenuByIdHandler,
    options: {
      auth: 'siresto_jwt',
    },
  },
  {
    method: 'PUT',
    path: '/menu/{id}',
    handler: handler.putMenuByIdHandler,
    options: {
      auth: 'siresto_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/menu/{id}',
    handler: handler.deleteMenuByIdHandler,
    options: {
      auth: 'siresto_jwt',
    },
  },
];

module.exports = routes;
