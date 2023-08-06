const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const MapEmployeesToModels = require('../../utils/map/employees');
const NotFoundError = require('../../../exceptions/client/NotFoundError');
const InvariantError = require('../../../exceptions/client/InvariantError');

class EmployeesService {
  constructor() {
    this._pool = new Pool();
  }

  async addEmployees({ userId, birthdate, ktpId }) {
    try {
      const query = {
        text: 'SELECT * FROM employees WHERE user_id = $1',
        values: [userId],
      };

      const result = await this._pool.query(query);

      if (!result.rowCount) {
        throw new NotFoundError(
          'Tidak terdapat pegawai. Anda dapat menambahkan Id menjadi pegawai.'
        );
      }
    } catch (error) {
      if (error instanceof NotFoundError) {
        const id = `employee-${nanoid(16)}`;
        const query = {
          text: 'INSERT INTO employees VALUES ($1, $2, $3, $4) RETURNING id',
          values: [id, userId, birthdate, ktpId],
        };
        Error;

        const result = await this._pool.query(query);

        if (!result.rowCount) {
          throw new InvariantError('Gagal menambahkan pegawai.');
        }

        return result.rows[0].id;
      }
    }

    throw new InvariantError(
      'User Id yang Anda masukkan sudah terdaftar menjadi pegawai.'
    );
  }

  async getEmployees() {
    console.log('disini bisa');

    const result = await this._pool.query(
      `SELECT 
      e.id,
      u.username,
      u.first_name,
      u.last_name
      FROM employees e
      LEFT JOIN users u ON u.id = e.user_id`
    );

    if (!result.rowCount) {
      throw new NotFoundError('Gagal mendapatkan pegawai.');
    }

    return result.rows.map(MapEmployeesToModels);
  }

  async getEmployeeById(employeeId) {
    const query = {
      text: `
            SELECT 
                e.id,
                u.username,
                u.first_name,
                u.last_name,
                u.email,
                u.address
                FROM employees e
                    LEFT JOIN users u ON u.id = e.user_id
                    WHERE e.id = $1
        `,
      values: [employeeId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Gagal mendapatkan pegawai, Id tidak ditemukan.');
    }

    return result.rows.map(MapEmployeesToModels)[0];
  }

  async deleteEmployeeById(employeeId) {
    const query = {
      text: 'DELETE FROM employees WHERE id = $1 RETURNING id',
      values: [employeeId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Gagal menghapus pegawai, Id tidak ditemukan.');
    }
  }

  async verifyEmployee(employeeId) {
    const query = {
      text: 'SELECT * FROM employee WHERE id = $1',
      values: [employeeId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new Error('Validasi pegawai gagal, Id bukan termasuk pegawai.');
    }
  }
}

module.exports = EmployeesService;
