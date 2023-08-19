/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('carts', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    menu_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    qty: {
      type: 'INT',
      notNull: true,
    },
  });

  pgm.addConstraint(
    'carts',
    'fk_carts.user_id_users.id',
    'FOREIGN KEY (user_id) REFERENCES users(id)'
  );

  pgm.addConstraint(
    'carts',
    'fk_carts.menu_id_menu.id',
    'FOREIGN KEY (menu_id) REFERENCES menu(id)'
  );
};

exports.down = (pgm) => {
  pgm.dropConstraint('carts', 'fk_carts.menu_id_menu.id');
  pgm.dropConstraint('carts', 'fk_carts.user_id_users.id');
  pgm.dropTable('carts');
};
