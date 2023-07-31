const routes = (handler) => [
  {
    method: 'POST',
    path: '/admins',
    handler: handler.postAdminsHandler,
  },
  {
    method: 'DELETE',
    path: '/admins/{id}',
    handler: handler.deleteAdminByIdHandler,
  },
];

module.exports = routes;
