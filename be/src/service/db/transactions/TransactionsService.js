const { Pool } = require('pg');
const { nanoid } = require('nanoid');

class TransactionsService {
  constructor() {
    this._pool = new Pool();
  }

  async addTransactions(userId, { menuId, qty }) {
    const id = `transaction-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO transactions VALUES ($1, $2, $3, $4) RETURNING id',
      values: [id, userId, menuId, qty],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new Error('Gagal menambahkan transaksi.');
    }
  }

  async getTransactions(userId) {
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
      throw new Error('Gagal mendapatkan transaksi user.');
    }

    return result.rows;
  }

  async deleteTransactions(userId, menuId) {
    const query = {
      text: 'DELETE FROM transactions WHERE user_id = $1 AND menu_id = $2 RETURNING id',
      values: [userId, menuId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new Error('Gagal menghapus transaksi.');
    }
  }
}

module.exports = TransactionsService;
