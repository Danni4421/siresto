const { Pool } = require('pg');
const InvariantError = require('../../../exceptions/client/InvariantError');
const NotFoundError = require('../../../exceptions/client/NotFoundError');
const AuthenticationError = require('../../../exceptions/client/AuthenticationError');
const { nanoid } = require('nanoid');

class AuthenticationsService {
  constructor() {
    this._pool = new Pool();
  }

  async addRefreshToken(refreshToken) {
    const id = `auth-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO authentications VALUES ($1, $2) RETURNING id',
      values: [id, refreshToken],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Gagal menambahkan refresh token.');
    }
  }

  async deleteRefreshToken(refreshToken) {
    const query = {
      text: 'DELETE FROM authentications WHERE token = $1 RETURNING id',
      values: [refreshToken],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError(
        'Gagal menghapus refresh token, Refresh token tidak valid.'
      );
    }
  }

  async verifyRefreshToken(refreshToken) {
    const query = {
      text: 'SELECT * FROM authentications WHERE token = $1',
      values: [refreshToken],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new AuthenticationError(
        'Gagal melakukan verifikasi refresh token, token tidak valid.'
      );
    }
  }
}

module.exports = AuthenticationsService;
