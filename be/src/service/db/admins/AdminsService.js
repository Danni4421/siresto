const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../../exceptions/client/InvariantError');
const NotFoundError = require('../../../exceptions/client/NotFoundError');

class AdminsService {
  constructor() {
    this._pool = new Pool();
  }

  async addAdmins({ employeeId }) {
    const id = `admin-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO admins VALUES ($1, $2) RETURNING id',
      values: [id, employeeId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Gagal menambahkan admin.');
    }

    return result.rows[0].id;
  }

  async deleteAdmins(adminId) {
    const query = {
      text: 'DELETE FROM admins WHERE id = $1 RETURNING id',
      values: [adminId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Gagal menghapus admin, Id tidak ditemukan.');
    }
  }

  async verifyAdmin(adminId) {
    const query = {
      text: 'SELECT * FROM admins WHERE id = $1',
      values: [adminId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new Error('Validasi gagal, Id bukan Admin.');
    }
  }
}

module.exports = AdminsService;
