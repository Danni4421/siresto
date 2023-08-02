const routes = (handler) => [
  {
    method: 'POST',
    path: '/menu/ingredients',
    handler: handler.postMenuIngredientHandler,
  },
  {
    method: 'GET',
    path: '/menu/{id}/ingredients',
    handler: handler.getMenuIngredientHandler,
  },
  {
    method: 'DELETE',
    path: '/menu/{menuId}/ingredients/{ingredientId}',
    handler: handler.deleteMenuIngredientByIdHandler,
  },
];

module.exports = routes;
