const { Pool } = require('pg');
const { nanoid } = require('nanoid');

class ChefsService {
  constructor() {
    this._pool = new Pool();
  }

  async addChefs({ employeeId, certifications }) {
    const id = `chef-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO chefs VALUES ($1, $2, $3) RETURNING id',
      values: [id, employeeId, certifications],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new Error('Gagal menambahkan chef.');
    }

    return result.rows[0].id;
  }

  async deleteChefById(chefId) {
    const query = {
      text: 'DELETE FROM chefs WHERE id = $1',
      values: [chefId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new Error('Gagal menghapus chef, Id tidak ditemukan.');
    }
  }

  async verifyChef(chefId) {
    const query = {
      text: 'SELECT * FROM chefs WHERE id = $1',
      values: [chefId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new Error('Validasi gagal, Pegawai bukan chef.');
    }
  }
}

module.exports = ChefsService;
