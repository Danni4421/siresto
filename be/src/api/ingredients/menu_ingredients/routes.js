const routes = (handler) => [
  {
    method: 'POST',
    path: '/menu/ingredients',
    handler: handler.postMenuIngredientHandler,
    options: {
      auth: 'siresto_jwt',
    },
  },
  {
    method: 'GET',
    path: '/menu/{id}/ingredients',
    handler: handler.getMenuIngredientHandler,
    options: {
      auth: 'siresto_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/menu/{menuId}/ingredients/{ingredientId}',
    handler: handler.deleteMenuIngredientByIdHandler,
    options: {
      auth: 'siresto_jwt',
    },
  },
];

module.exports = routes;
