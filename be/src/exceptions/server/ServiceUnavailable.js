const InternalServerError = require('./InternalServerError');

class ServiceUnavailable extends InternalServerError {
  constructor(message) {
    super(message, 503);
    this.name = 'ServiceUnavailable';
  }
}

module.exports = ServiceUnavailable;
