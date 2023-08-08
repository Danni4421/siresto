const ClientError = require('./exceptions/client/ClientError');
const InvariantError = require('./exceptions/client/InvariantError');
const NotFoundError = require('./exceptions/client/NotFoundError');
const AuthenticationsError = require('./exceptions/client/AuthenticationError');
const ServiceUnavailable = require('./exceptions/server/ServiceUnavailable');
const AuthorizationError = require('./exceptions/client/AuthorizationError');

const ErrorHandler = (server) => {
  server.ext('onPreResponse', (request, h) => {
    const { response } = request;
    if (response instanceof Error) {
      console.log(response);
      if (response instanceof ClientError) {
        if (response instanceof InvariantError) {
          const invariantError = h.response({
            status: 'fail',
            message: response.message,
          });
          invariantError.code(response.statusCode);
          return invariantError;
        }

        if (response instanceof NotFoundError) {
          const notFoundError = h.response({
            status: 'fail',
            message: response.message,
          });
          notFoundError.code(response.statusCode);
          return notFoundError;
        }

        if (response instanceof AuthenticationsError) {
          const authError = h.response({
            status: 'fail',
            message: response.message,
          });
          authError.code(response.statusCode);
          return authError;
        }

        if (response instanceof AuthorizationError) {
          const authtorizationError = h.response({
            status: 'fail',
            message: response.message,
          });
          authtorizationError.code(response.statusCode);
          return authtorizationError;
        }

        const clientError = h.response({
          status: 'fail',
          message: response.message,
        });
        clientError.code(response.statusCode);
        return clientError;
      }

      if (!response.server) {
        return h.continue;
      }

      if (response instanceof InternalServerError) {
        if (response instanceof ServiceUnavailable) {
          const serviceUnavailable = h.response({
            status: 'fail',
            message: response.message,
          });
          serviceUnavailable.code(response.statusCode);
          return serviceUnavailable;
        }

        const internalServer = h.response({
          status: 'fail',
          message: response.message,
        });
        internalServer.code(response.statusCode);
        return internalServer;
      }

      const _error = h.response({
        status: 'fail',
        message: response.message,
      });
      _error.code(500);
      return _error;
    }

    return h.continue;
  });
};

module.exports = ErrorHandler;
