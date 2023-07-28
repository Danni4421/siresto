const { Pool } = require('pg');
const { nanoid } = require('nanoid');

class EmployeesService {
  constructor() {
    this._pool = new Pool();
  }

  async addEmployees({ userId, birthdate, ktpId }) {
    const id = `employee-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO employees VALUES ($1, $2, $3, $4) RETURNING id',
      values: [id, userId, birthdate, ktpId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new Error('Gagal menambahkan pegawai.');
    }

    return result.rows[0].id;
  }

  // need fix
  async getEmployees() {
    const result = await this._pool.query(
      `SELECT 
            e.id,
            u.username,
            u.first_name,
            u.last_name,
            FROM employees e
                LEFT JOIN users u ON u.id = e.user_id`
    );

    if (!result.rowCount) {
      throw new Error('Gagal mendapatkan pegawai.');
    }

    return result.rows.map; // fix map to model employees
  }

  // need fix
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
        `,
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new Error('Gagal mendapatkan pegawai, Id tidak ditemukan.');
    }

    return result.rows.map; // fix map to model employees
  }

  async deleteEmployeeById(employeeId) {
    const query = {
      text: 'DELETE FROM employees WHERE id = $1 RETURNING id',
      values: [employeeId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new Error('Gagal menghapus pegawai, Id tidak ditemukan.');
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
