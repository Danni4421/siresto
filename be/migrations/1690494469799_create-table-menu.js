/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('menu', {
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
    category_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
  });

  pgm.addConstraint(
    'menu',
    'fk_menu.category_id_categories.id',
    'FOREIGN KEY (category_id) REFERENCES categories(id)'
  );
};

exports.down = (pgm) => {
  pgm.dropConstraint('menu', 'fk_menu.category_id_categories.id');
  pgm.dropTable('menu');
};
