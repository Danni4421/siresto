const routes = (handler) => [
  {
    method: 'POST',
    path: '/carts',
    handler: handler.addCartsHandler,
    options: {
      auth: 'siresto_jwt',
    },
  },
  {
    method: 'GET',
    path: '/carts',
    handler: handler.getCartsHandler,
    options: {
      auth: 'siresto_jwt',
    },
  },
  {
    method: 'GET',
    path: '/carts/{id}',
    handler: handler.getCartByIdHandler,
    options: {
      auth: 'siresto_jwt',
    },
  },
  {
    method: 'GET',
    path: '/carts/menu/{id}',
    handler: handler.getCartByMenuIdHandler,
    options: {
      auth: 'siresto_jwt',
    },
  },
  {
    method: 'PUT',
    path: '/carts/{id}',
    handler: handler.putCartByIdHandler,
    options: {
      auth: 'siresto_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/carts/{id}',
    handler: handler.delCartByIdHandler,
    options: {
      auth: 'siresto_jwt',
    },
  },
];

module.exports = routes;
