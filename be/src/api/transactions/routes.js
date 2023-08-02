const routes = (handler) => [
  {
    method: 'POST',
    path: '/transactions',
    handler: handler.postTransactionsHandler,
  },
  {
    method: 'GET',
    path: '/transactions/users/{userId}',
    handler: handler.getTransactionsUserHandler,
  },
  {
    method: 'DELETE',
    path: '/transactions/{transactionId}/users/{userId}',
    handler: handler.deleteTransactionsUserHandler,
  },
];

module.exports = routes;
