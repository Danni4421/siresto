const routes = (handler) => [
  {
    method: 'POST',
    path: '/superadmin',
    handler: handler.postAuthenticationsSuperAdminHandler,
  },
];

module.exports = routes;
