const { Pool } = require('pg');
const { nanoid } = require('nanoid');

class CategoriesService {
  constructor() {
    this._pool = new Pool();
  }

  async addCategories({ name }) {
    const id = `category-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO categories VALUES ($1, $2) RETURNING id',
      values: [id, name],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new Error('Gagal menambahkan kategori.');
    }

    return result.rows[0].id;
  }

  async getCategories() {
    const result = await this._pool.query(`
            SELECT * FROM categories
        `);

    if (!result.rowCount) {
      throw new Error('Gagal mendapatkan kategori.');
    }

    return result.rows;
  }

  async putCategoryById(categoryId, { name }) {
    const query = {
      text: 'UPDATE categories SET name = $1 WHERE id = $2',
      values: [name, categoryId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new Error('Gagal memperbarui kategori, Id tidak ditemukan.');
    }
  }

  async deleteCategoryById(categoryId) {
    const query = {
      text: 'DELETE FROM categories WHERE id = $1 RETURNING id',
      values: [categoryId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new Error('Gagal menghapus kategori, Id tidak ditemukan.');
    }
  }
}

module.exports = CategoriesService;
