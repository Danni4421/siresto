const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const MapUsersToModels = require('../../utils/map/users');

class UsersService {
  constructor() {
    this._pool = new Pool();
  }

  async addUsers({ username, firstName, lastName, password, email, address }) {
    const id = `users-${nanoid(16)}`;
    const _username = `${+new Date()}-${username}`;
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO users VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id',
      values: [
        id,
        _username,
        firstName,
        lastName,
        hashedPassword,
        email,
        address,
        createdAt,
        updatedAt,
      ],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new Error('Gagal menambahkan User.');
    }

    return result.rows[0].id;
  }

  async getUsers() {
    const result = await this._pool.query(`
      SELECT 
        (id, username, first_name, last_name, email, address)
        FROM users
    `);

    if (!result.rowCount) {
      throw new Error('User tidak ditemukan.');
    }

    return result.rows.map(MapUsersToModels);
  }

  async getUserById(userId) {
    const query = {
      text: `
        SELECT 
          (id, username, first_name, last_name, email, address)
          FROM users
          WHERE id = $1
      `,
      values: [userId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new Error('Gagal mendapatkan User, Id tidak ditemukan.');
    }

    return result.rows.map(MapUsersToModels)[0];
  }

  async putUserById(userId, { username, firstName, lastName, email, address }) {
    const updatedAt = new Date().toISOString();
    const query = {
      text: `
        UPDATE users SET
        username = $1,
        first_name = $2,
        last_name = $3,
        email = $4,
        address = $5,
        updated_at = $6
        WHERE id = $7
      `,
      values: [
        username,
        firstName,
        lastName,
        email,
        address,
        updatedAt,
        userId,
      ],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new Error('Gagal memperbarui User. Id tidak ditemukan.');
    }
  }

  async deleteUserById(userId) {
    const query = {
      text: 'DELETE FROM users WHERE id = $1 RETURNING id',
      values: [userId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new Error('Gagal menghapus User, Id tidak ditemukan.');
    }
  }
}

module.exports = UsersService;
