const routes = (handler) => [
  {
    method: 'POST',
    path: '/ingredients',
    handler: handler.postIngredientsHandler,
    options: {
      auth: 'siresto_jwt',
    },
  },
  {
    method: 'GET',
    path: '/ingredients',
    handler: handler.getIngredientsHandler,
    options: {
      auth: 'siresto_jwt',
    },
  },
  {
    method: 'GET',
    path: '/ingredients/{id}',
    handler: handler.getIngredientsHandler,
    options: {
      auth: 'siresto_jwt',
    },
  },
  {
    method: 'PUT',
    path: '/ingredients/{id}',
    handler: handler.putIngredientByIdHandler,
    options: {
      auth: 'siresto_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/ingredients/{id}',
    handler: handler.deleteIngredientByIdHandler,
    options: {
      auth: 'siresto_jwt',
    },
  },
];

module.exports = routes;
