const autoBind = require('auto-bind');
const InvariantError = require('../../exceptions/client/InvariantError');

class TransactionsHandler {
  constructor(
    transactionsService,
    menuIngredientsService,
    ingredientsService,
    validator
  ) {
    this._transactionsService = transactionsService;
    this._menuIngredientsService = menuIngredientsService;
    this._ingredientsService = ingredientsService;
    this._validator = validator;

    autoBind(this);
  }

  async postTransactionsHandler(request, h) {
    this._validator.validatePostTransactionsPayload(request.payload);
    const { id: userId } = request.auth.credentials;
    const { menuId, qty } = request.payload;

    const menuIngredients =
      await this._menuIngredientsService.getMenuIngredients(menuId);

    try {
      await Promise.all(
        menuIngredients.map(async (i) => {
          const neededStock = i.qty * qty;
          await this._ingredientsService.verifyIngredientStock(
            i.id,
            neededStock
          );
        })
      );
    } catch (error) {
      if (error instanceof InvariantError) {
        throw error;
      }
    }

    const transactionId = await this._transactionsService.addTransactions(
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
    const { id: userId } = request.auth.credentials;
    const userTransactions = await this._transactionsService.getTransactions(
      userId
    );
    return {
      status: 'success',
      message: 'Berhasil mendapatkan transaksi.',
      data: {
        userTransactions,
      },
    };
  }

  async deleteTransactionsUserHandler(request) {
    const { id: userId } = request.auth.credentials;
    const { transactionId } = request.params;
    await this._transactionsService.deleteTransactionById(
      transactionId,
      userId
    );
    return {
      status: 'success',
      message: 'Berhasil menghapus transaksi.',
    };
  }
}

module.exports = TransactionsHandler;
