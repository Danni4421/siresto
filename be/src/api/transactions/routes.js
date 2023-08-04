const routes = (handler) => [
  {
    method: 'POST',
    path: '/transactions',
    handler: handler.postTransactionsHandler,
    options: {
      auth: 'siresto_jwt',
    },
  },
  {
    method: 'GET',
    path: '/transactions',
    handler: handler.getTransactionsUserHandler,
    options: {
      auth: 'siresto_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/transactions/{transactionId}/users',
    handler: handler.deleteTransactionsUserHandler,
    options: {
      auth: 'siresto_jwt',
    },
  },
];

module.exports = routes;
