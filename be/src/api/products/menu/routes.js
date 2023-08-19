const path = require('path');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/menu',
    handler: handler.postMenuHandler,
    options: {
      auth: 'siresto_jwt',
    },
  },
  {
    method: 'POST',
    path: '/menu/{id}/covers',
    handler: handler.postMenuCoverHandler,
    options: {
      auth: 'siresto_jwt',
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
      },
    },
  },
  {
    method: 'GET',
    path: '/menu',
    handler: handler.getMenuHandler,
  },
  {
    method: 'GET',
    path: '/menu/{id}',
    handler: handler.getMenuByIdHandler,
  },
  {
    method: 'GET',
    path: '/menu/{id}/stock',
    handler: handler.getMenuStockHandler,
  },
  {
    method: 'GET',
    path: '/menu/search',
    handler: handler.searchMenuHandler,
  },
  {
    method: 'GET',
    path: '/menu/{id}/covers/{param*}',
    handler: {
      directory: {
        path: path.resolve(__dirname, 'covers/img'),
      },
    },
  },
  {
    method: 'PUT',
    path: '/menu/{id}',
    handler: handler.putMenuByIdHandler,
    options: {
      auth: 'siresto_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/menu/{id}',
    handler: handler.deleteMenuByIdHandler,
    options: {
      auth: 'siresto_jwt',
    },
  },
];

module.exports = routes;
