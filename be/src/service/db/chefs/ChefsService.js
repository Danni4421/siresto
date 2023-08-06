const { Pool } = require('pg');
const { nanoid } = require('nanoid');

const NotFoundError = require('../../../exceptions/client/NotFoundError');
const InvariantError = require('../../../exceptions/client/InvariantError');
const AuthorizationError = require('../../../exceptions/client/AuthorizationError');
const MapChefsToModels = require('../../utils/map/chefs');

class ChefsService {
  constructor() {
    this._pool = new Pool();
  }

  async addChefs({ employeeId, certifications }) {
    try {
      const getChef = await this._pool.query(
        `SELECT * FROM chefs WHERE employee_id = '${employeeId}'`
      );

      if (getChef.rowCount) {
        throw new InvariantError('Chef sudah ada.');
      } else {
        throw new NotFoundError('Chef belum ada.');
      }
    } catch (error) {
      if (error instanceof InvariantError) {
        throw error;
      }

      if (error instanceof NotFoundError) {
        console.log(employeeId, certifications);
        const id = `chef-${nanoid(16)}`;
        const query = {
          text: 'INSERT INTO chefs VALUES ($1, $2, $3) RETURNING id',
          values: [id, employeeId, certifications],
        };
        const result = await this._pool.query(query);

        if (!result.rowCount) {
          throw new InvariantError('Gagal menambahkan chef.');
        }

        return result.rows[0].id;
      }
    }
  }

  async getChefs() {
    const result = await this._pool.query('SELECT * FROM chefs');

    if (!result.rowCount) {
      throw new NotFoundError('Gagal mendapatkan chef.');
    }

    return result.rows.map(MapChefsToModels);
  }

  async getChefById(chefId) {
    const query = {
      text: 'SELECT * FROM chefs WHERE id = $1',
      values: [chefId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Gagal mendapatkan chef.');
    }

    return result.rows.map(MapChefsToModels)[0];
  }

  async deleteChefById(chefId) {
    const query = {
      text: 'DELETE FROM chefs WHERE id = $1',
      values: [chefId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Gagal menghapus chef, Id tidak ditemukan.');
    }
  }

  async verifyChef(userId) {
    const query = {
      text: `
        SELECT 
          c.id
        FROM chefs c
          LEFT JOIN employees e ON e.id = c.employee_id
          LEFT JOIN users u ON u.id = e.user_id
        WHERE u.id = $1
      `,
      values: [userId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new AuthorizationError('Validasi gagal, Anda bukan chef.');
    }
  }
}

module.exports = ChefsService;
