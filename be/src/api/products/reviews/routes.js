const routes = (handler) => [
  {
    method: 'POST',
    path: '/reviews',
    handler: handler.postReviewsHandler,
    options: {
      auth: 'siresto_jwt',
    },
  },
  {
    method: 'GET',
    path: '/reviews',
    handler: handler.getReviewsHandler,
  },
  {
    method: 'GET',
    path: '/reviews/users',
    handler: handler.getReviewUserHandler,
    options: {
      auth: 'siresto_jwt',
    },
  },
  {
    method: 'GET',
    path: '/reviews/menu/{id}',
    handler: handler.getReviewMenuHandler,
  },
  {
    method: 'GET',
    path: '/reviews/menu/{id}/rate',
    handler: handler.getMenuRatingHandler,
  },
  {
    method: 'PUT',
    path: '/reviews/menu/{id}',
    handler: handler.putReviewMenuHandler,
    options: {
      auth: 'siresto_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/reviews/menu/{id}',
    handler: handler.deleteReviewMenuHandler,
    options: {
      auth: 'siresto_jwt',
    },
  },
];

module.exports = routes;
