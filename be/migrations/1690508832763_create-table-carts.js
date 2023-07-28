/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('carts', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    transaction_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    order_date: {
      type: 'DATE',
      notNull: true,
    },
    status: {
      type: 'TEXT',
      notNull: true,
    },
  });

  pgm.addConstraint(
    'carts',
    'fk_carts.transaction_id_transactions.id',
    'FOREIGN KEY (transaction_id) REFERENCES transactions(id)'
  );
};

exports.down = (pgm) => {
  pgm.dropConstraint('carts', 'fk_carts.transaction_id_transactions.id');
  pgm.dropTable('transactions');
};
