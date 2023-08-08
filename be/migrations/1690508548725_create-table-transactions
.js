/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('transactions', {
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
    transaction_date: {
      type: 'DATE',
      notNull: true,
    },
    qty: {
      type: 'INT',
      notNull: true,
    },
    transaction_status: {
      type: 'TEXT',
      notNull: true,
    },
  });

  pgm.addConstraint(
    'transactions',
    'fk_transactions.user_id_users.id',
    'FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE'
  );

  pgm.addConstraint(
    'transactions',
    'fk_transactions.menu_id_menu.id',
    'FOREIGN KEY (menu_id) REFERENCES menu(id)'
  );
};

exports.down = (pgm) => {
  pgm.dropConstraint('transactions', 'fk_transactions.menu_id_menu.id');
  pgm.dropConstraint('transactions', 'fk_transactions.user_id_users.id');
  pgm.dropTable('transactions');
};
