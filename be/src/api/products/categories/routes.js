const routes = (handler) => [
  {
    method: 'POST',
    path: '/categories',
    handler: handler.postCategoriesHandler,
  },
  {
    method: 'GET',
    path: '/categories',
    handler: handler.getCategoriesHandler,
  },
  {
    method: 'PUT',
    path: '/categories/{id}',
    handler: handler.putCategoryByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/categories/{id}',
    handler: handler.deleteCategoryByIdHandler,
  },
];

module.exports = routes;
