const routes = (handler) => [
  {
    method: 'POST',
    path: '/categories',
    handler: handler.postCategoriesHandler,
    options: {
      auth: 'siresto_jwt',
    },
  },
  {
    method: 'GET',
    path: '/categories',
    handler: handler.getCategoriesHandler,
    options: {
      auth: 'siresto_jwt',
    },
  },
  {
    method: 'PUT',
    path: '/categories/{id}',
    handler: handler.putCategoryByIdHandler,
    options: {
      auth: 'siresto_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/categories/{id}',
    handler: handler.deleteCategoryByIdHandler,
    options: {
      auth: 'siresto_jwt',
    },
  },
];

module.exports = routes;
