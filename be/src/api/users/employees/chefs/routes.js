const routes = (handler) => [
  {
    method: 'POST',
    path: '/chefs',
    handler: handler.postChefsHandler,
    options: {
      auth: 'superadmin_jwt',
    },
  },
  {
    method: 'GET',
    path: '/chefs',
    handler: handler.getChefsHandler,
    options: {
      auth: 'siresto_jwt' || 'superadmin_jwt',
    },
  },
  {
    method: 'GET',
    path: '/chefs/{id}',
    handler: handler.getChefByIdHandler,
    options: {
      auth: 'siresto_jwt' || 'superadmin_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/chefs/{id}',
    handler: handler.deleteChefByIdHandler,
    options: {
      auth: 'superadmin_jwt',
    },
  },
];

module.exports = routes;
