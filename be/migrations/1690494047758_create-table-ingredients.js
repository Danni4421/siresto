/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('ingredients', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    name: {
      type: 'VARCHAR(100)',
      notNull: true,
    },
    price: {
      type: 'INT',
      notNull: true,
    },
    stock: {
      type: 'INT',
      notNull: true,
    },
    ms_unit: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('ingredients');
};
