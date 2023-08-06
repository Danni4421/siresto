const routes = (handler) => [
  {
    method: 'POST',
    path: '/admins',
    handler: handler.postAdminsHandler,
    options: {
      auth: 'superadmin_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/admins/{id}',
    handler: handler.deleteAdminByIdHandler,
    options: {
      auth: 'superadmin_jwt',
    },
  },
];

module.exports = routes;
