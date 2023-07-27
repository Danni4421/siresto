const routes = (handler) => [
  {
    method: 'POST',
    path: '/chef',
    handler: handler.postChefHandler,
  },
  {
    method: 'GET',
    path: '/chef',
    handler: handler.getChefHandler,
  },
  {
    method: 'GET',
    path: '/chef/{id}',
    handler: handler.getChefByIdHandler,
  },
  {
    method: 'PUT',
    path: '/chef/{id}',
    handler: handler.putChefByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/chef/{id}',
    handler: handler.deleteChefByIdHandler,
  },
];

module.exports = routes;
