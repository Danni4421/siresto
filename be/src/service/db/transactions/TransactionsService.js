const { Pool } = require('pg');
const { nanoid } = require('nanoid');

const InvariantError = require('../../../exceptions/client/InvariantError');
const NotFoundError = require('../../../exceptions/client/NotFoundError');

class TransactionsService {
  constructor(cacheService) {
    this._pool = new Pool();
    this._cacheService = cacheService;
  }

  async addTransactions(userId, { menuId, date, qty, status }) {
    const id = `transaction-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO transactions VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [id, userId, menuId, date, qty, status],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Gagal menambahkan transaksi.');
    }

    await this._cacheService.remove(`transactions:${userId}`);

    return result.rows[0].id;
  }

  async getTransactions(userId) {
    const key = `transactions:${userId}`;
    try {
      const result = await this._cacheService.get(key);
      const transactions = JSON.parse(result);
      return transactions;
    } catch (error) {
      const query = {
        text: `
            SELECT 
                m.name,
                (m.price * t.qty) AS "total"
                FROM transactions t
                    LEFT JOIN menu m ON t.menu_id = m.id
                    WHERE t.user_id = $1
        `,
        values: [userId],
      };

      const result = await this._pool.query(query);

      if (!result.rowCount) {
        throw new NotFoundError('Gagal mendapatkan transaksi user.');
      }

      const transactions = result.rows;
      const value = JSON.stringify(transactions);
      await this._cacheService.set(key, value);

      return transactions;
    }
  }

  async deleteTransactionById(transactionId, userId) {
    const query = {
      text: 'DELETE FROM transactions WHERE id = $1 AND user_id = $2 RETURNING id',
      values: [transactionId, userId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new Error('Gagal menghapus transaksi.');
    }

    await this._cacheService.remove(`transactions:${userId}`);
  }
}

module.exports = TransactionsService;
