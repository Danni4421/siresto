const autoBind = require('auto-bind');

class TransactionsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async postTransactionsHandler(request, h) {
    this._validator.validatePostTransactionsPayload(request.payload);
    const userId = 'user-BW5AMEB-71SB9W78';
    const transactionId = await this._service.addTransactions(
      userId,
      request.payload
    );
    const response = h.response({
      status: 'success',
      message: 'Berhasil menambahkan transaksi.',
      data: {
        transactionId,
      },
    });
    response.code(201);
    return response;
  }

  async getTransactionsUserHandler(request) {
    const { userId } = request.params;
    const userTransactions = await this._service.getTransactions(userId);
    return {
      status: 'success',
      message: 'Berhasil mendapatkan transaksi.',
      data: {
        userTransactions,
      },
    };
  }

  async deleteTransactionsUserHandler(request) {
    const { transactionId, userId } = request.params;
    await this._service.deleteTransactionById(transactionId, userId);
    return {
      status: 'success',
      message: 'Berhasil menghapus transaksi.',
    };
  }
}

module.exports = TransactionsHandler;
