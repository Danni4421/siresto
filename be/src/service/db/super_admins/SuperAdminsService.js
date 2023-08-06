const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const AuthenticationError = require('../../../exceptions/client/AuthenticationError');
const NotFoundError = require('../../../exceptions/client/NotFoundError');

class SuperAdminsService {
  constructor() {
    this._pool = new Pool();
  }

  async verifySuperAdmin({ username, password }) {
    const query = {
      text: 'SELECT id, password FROM super_admins WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError(`${username} bukan super admin.`);
    }

    const { id, password: hashedPassword } = result.rows[0];

    const isMatch = await bcrypt.compare(password, hashedPassword);

    if (!isMatch) {
      throw new AuthenticationError(
        'Validasi gagal dilakukan, Kredensial yang diberikan salah.'
      );
    }

    return id;
  }

  async validateSuperAdmin({ id }) {
    const query = {
      text: 'SELECT * FROM super_admins WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Validasi gagal, Id bukan super admin.');
    }
  }
}

module.exports = SuperAdminsService;
