const routes = (handler) => [
  {
    method: 'POST',
    path: '/ingredients',
    handler: handler.postIngredientsHandler,
  },
  {
    method: 'GET',
    path: '/ingredients',
    handler: handler.getIngredientsHandler,
  },
  {
    method: 'GET',
    path: '/ingredients/{id}',
    handler: handler.getIngredientByIdHandler,
  },
  {
    method: 'PUT',
    path: '/ingredients/{id}',
    handler: handler.putIngredientByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/ingredients/{id}',
    handler: handler.deleteIngredientByIdHandler,
  },
];

module.exports = routes;
