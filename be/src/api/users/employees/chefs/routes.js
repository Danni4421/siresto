const routes = (handler) => [
  {
    method: 'POST',
    path: '/chefs',
    handler: handler.postChefsHandler,
  },
  {
    method: 'GET',
    path: '/chefs',
    handler: handler.getChefsHandler,
  },
  {
    method: 'GET',
    path: '/chefs/{id}',
    handler: handler.getChefByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/chefs/{id}',
    handler: handler.deleteChefByIdHandler,
  },
];

module.exports = routes;
